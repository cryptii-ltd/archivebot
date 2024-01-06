''' Backend microservice - Manages retrieval/creation of encrypted messages '''

import ast
import time
import asyncio
import shutil
from typing import Final
from hashlib import sha256
import logging

import mariadb

from flask import Blueprint, request, request, g

from modules import crypto
from modules.passphrase import passphrase
from modules.connectors import connector_mariadb
from modules.config import get_config


V1 = Blueprint('v1', __name__)


@V1.before_request
def before():
    ''' Catch all requests, then log them out. '''

    forwarded_for = request.headers.get('X-Forwarded-For')
    ip_address = forwarded_for if forwarded_for else request.remote_addr

    # Handle the case where 'X-Forwarded-For' header is None
    if ip_address is None or ip_address.lower() == 'none':
        ip_address = '127.0.0.1'  # Default to localhost IP

    g.ip_address = ip_address
    g.request_start_time = time.time()

    if request.method != 'GET' and request.method != 'OPTIONS':
        if (request.headers.get('Authorization') is None or request.headers.get('Authorization') != get_config('auth', 'clientsecret')):
            logging.warning('Incorrect or missing "Authorization" header. Value received: "%s"', request.headers.get('Authorization'))
            return {}, 401

    logging.info('%s - %s - %s',
        g.ip_address,
        request.method,
        request.path
    )


@V1.after_request
def after(response):
    ''' Log the response code and duration after each request. '''

    duration = round(time.time() - g.request_start_time, 4)
    logging.info('------------- [%s | Completed in %ss] ------------- ',
        response.status_code,
        duration
    )

    return response


@V1.route('/serverinfo/storage')
def get_storage_remaining() -> dict[str, str]:
    '''
    Gets the total amount of remaining storage in GB

    Returns:
        dict[str, float]: Gigabytes left
    '''

    mount_path = '/mnt'
    total, used, free = shutil.disk_usage(mount_path) # pylint: disable=W0612
    return {"remaining": str((free // (2**30)))}


@V1.route('/archives/<user_id>')
def list_archives(user_id: str):
    '''
    Args:
        user_id (str): Plain text user id to fetch archive names.

    Returns:
        dict: archives associated to queries user.
    '''

    conn: mariadb.Connection
    cursor: mariadb.Cursor
    conn, cursor = connector_mariadb.connect(get_config('database', 'localdb_ip'), db=get_config('database', 'localdb_name'))

    cursor.execute('SELECT archive_name FROM data WHERE user_id=%s', (user_id,))
    archives: tuple =  cursor.fetchall()
    conn.close()

    return {
        'archives': archives
    }


@V1.route('/archives/guild/<guild_id>/<user_id>')
def list_archives_guild(guild_id, user_id):
    '''
    Args:
        guild_id (str): Plain text guild id to fetch archive names

        user_id (str): Plain text user id to fetch archive names

    Returns:
        dict: number of archives related to user for guild.
    '''

    conn: mariadb.Connection
    cursor: mariadb.Cursor
    conn, cursor = connector_mariadb.connect(get_config('database', 'localdb_ip'), db=get_config('database', 'localdb_name'))

    cursor.execute("SELECT archive_name FROM data WHERE user_id=%s AND guild_id=%s", (user_id, guild_id,))
    archives: tuple = cursor.fetchall()
    conn.close()

    if archives is None:
        archives: int = 0

    archives: int = len(archives)

    return {
        'archives': archives
    }


@V1.route('/archives/auth', methods=['POST'])
def check_auth():
    '''
    Args:
        user_id (str): Plain text user id to fetch archive.
        passphrase (str): Passphrase of archive
    '''

    body: dict = request.json

    if 'passphrase' not in body:
        logging.warning('Missing passphrase')
        return 'Missing passphrase', 400

    if 'user_id' not in body:
        logging.warning('Missing user_id')
        return 'Missing user_id', 400

    phrase: str = body.get('passphrase')
    user_id: str = body.get('user_id')

    hashed_phrase: str = sha256(phrase.encode()).hexdigest()
    conn: mariadb.Connection
    cursor: mariadb.Cursor
    conn, cursor = connector_mariadb.connect(get_config('database', 'localdb_ip'), db=get_config('database', 'localdb_name'))

    logging.info('Authenticating...')
    logging.info('passphrase: %s, user_id: %s', hashed_phrase, user_id)
    cursor.execute("SELECT user_id FROM data WHERE passphrase=%s AND user_id=%s", (hashed_phrase, user_id,))

    auth_query: str = cursor.fetchone()

    if not auth_query:
        conn.close()
        logging.warning('Not authorized')
        return 'Not authorized', 403

    return {}


@V1.route('/archives', methods=['POST'])
def reset_archive_password() -> dict:
    '''
    Get archive password

    Args:
        user_id (str): Plain text string of users_id

    Returns:
        dict: passphrase(s) associated with Archive.
    '''

    body: dict = request.json

    if 'archive_name' not in body:
        logging.warning('Missing archive_name')
        return 'Missing archive_name', 400

    if 'user_id' not in body:
        logging.warning('Missing user_id')
        return 'Missing user_id', 400

    logging.info('Starting password reset...')

    archive_name: str = body.get('archive_name')
    user_id: str = body.get('user_id')

    conn: mariadb.Connection
    cursor: mariadb.Cursor
    conn, cursor = connector_mariadb.connect(get_config('database', 'localdb_ip'), db=get_config('database', 'localdb_name'))

    logging.info('Fetching current encryption key...')
    cursor.execute("SELECT encryption_key FROM data WHERE archive_name=%s AND user_id=%s", (archive_name, user_id,))

    current_encrypt_key: str = cursor.fetchone()

    if not current_encrypt_key:
        logging.warning('No encryption key found')
        return 'no encryption key found', 404

    current_encrypt_key = current_encrypt_key[0]

    logging.info('Fetching current passphrase...')
    cursor.execute("SELECT passphrase FROM data WHERE user_id=%s AND encryption_key=%s", (user_id, current_encrypt_key,))

    current_pass: str = cursor.fetchone()

    if not current_encrypt_key:
        logging.warning('No passphrase found')
        return 'no passphrase found', 404

    current_pass = current_pass[0]

    # Get location so that we can reset the passphrase on the block storage server
    logging.info('Getting archive location...')
    cursor.execute('SELECT storage_server FROM data WHERE encryption_key=%s', (current_encrypt_key,))

    storage_server: str = cursor.fetchone()

    if storage_server is None:
        logging.warning("Couldn't find archive. Storage location (IP) not found.")
        return 'Archive not found', 404

    storage_server = storage_server[0]

    # Close connection to local db, then connect to remote storage server...
    conn.close()
    conn, cursor = connector_mariadb.connect(storage_server)

    if conn is None:
        logging.critical('FAILED TO CONNECT TO BLOCK STORAGE SERVER: %s', storage_server)
        return 'Failed to connect to block storage server', 507

    logging.info('Grabbing messages from %s...', storage_server)
    cursor.execute('SELECT json FROM messages WHERE hashed_passphrase=%s', (current_pass,))
    encrypted_messages = cursor.fetchone()

    if encrypted_messages is None:
        conn.close()
        logging.info('No messages found on server')
        return 'no messages found', 404

    logging.info('Decoding...')
    encrypted_messages = encrypted_messages[0].decode()
    decrypted_messages = crypto.decrypt(encrypted_messages, current_encrypt_key)

    new_generated_passphrase: str = generate_passphrase()

    logging.info('Generating encryption key...')
    new_encryption_key = crypto.generate_key()

    logging.info('Encrypting messages with new encryption key...')
    new_encrypted_messages = crypto.encrypt(decrypted_messages, new_encryption_key)

    logging.info('Updating passphrase and messages on %s...', storage_server)
    cursor.execute('UPDATE messages SET hashed_passphrase=%s, json=%s WHERE hashed_passphrase=%s', (sha256(new_generated_passphrase.encode()).hexdigest(), new_encrypted_messages, current_pass,))
    conn.commit()
    conn.close()

    conn, cursor = connector_mariadb.connect(get_config('database', 'localdb_ip'), db=get_config('database', 'localdb_name'))

    # Hash passphrase, grab encryption key, and write messages to db using encryption key as identifier.
    logging.info('Updating local DB...')
    cursor.execute('UPDATE data SET passphrase=%s, encryption_key=%s WHERE passphrase=%s AND encryption_key=%s', (sha256(new_generated_passphrase.encode()).hexdigest(), new_encryption_key, current_pass, current_encrypt_key,))
    conn.commit()
    conn.close()

    return {
        'passphrase': new_generated_passphrase
    }


@V1.route('/messages/<phrase>', methods=['GET', 'DELETE'])
@V1.route('/messages', defaults={'phrase': None}, methods=['POST'])
def manage_messages(phrase) -> dict:  # pylint: disable="W0621"
    '''
    Manage messages

    Args:
        passphrase (str): Plain text passphrase used to fetch decryption key.

    Returns:
        dict: messages as json
    '''

    if request.method == 'GET':
        if phrase is None:
            return 'invalid passphrase', 401

        conn: mariadb.Connection
        cursor: mariadb.Cursor
        conn, cursor = connector_mariadb.connect(get_config('database', 'localdb_ip'), db=get_config('database', 'localdb_name'))

        # Get passphrase hash and encryption key
        hashed_phrase: str = sha256(phrase.encode()).hexdigest()
        encryption_key: str

        cursor.execute('SELECT passphrase FROM data WHERE passphrase=%s', (hashed_phrase,))
        hashed_phrase: str = cursor.fetchone()

        if hashed_phrase is None:
            return 'forbidden', 401

        hashed_phrase = hashed_phrase[0]

        cursor.execute('SELECT encryption_key FROM data WHERE passphrase=%s', (hashed_phrase,))
        encryption_key: str = cursor.fetchone()

        if encryption_key is None:
            logging.error("Couldn't retrieve encryption key from local DB!")
            return 'forbidden', 401

        encryption_key = encryption_key[0]

        # Get messages
        cursor.execute('SELECT storage_server FROM data WHERE encryption_key=%s', (encryption_key,))
        location: str = cursor.fetchone()[0]
        conn.close()

        conn, cursor = connector_mariadb.connect(location)

        if conn is None:
            logging.critical('FAILED TO CONNECT TO BLOCK STORAGE SERVER: %s', location)
            return 'Failed to connect to block storage server', 500

        cursor.execute('SELECT json FROM messages WHERE hashed_passphrase=%s', (hashed_phrase,))
        encrypted_messages = cursor.fetchone()

        if encrypted_messages is None:
            conn.close()
            logging.warning('No messages found')
            return 'no messages found', 404

        encrypted_messages = encrypted_messages[0].decode()

        decrypted_messages = ast.literal_eval(crypto.decrypt(encrypted_messages, encryption_key))
        decrypted_messages['messages'] = decrypted_messages.get('messages')

        return decrypted_messages

    if request.method == 'POST':
        # Pick storage server
        storage_servers: dict = get_config('storage')
        storage_servers: list = storage_servers.get('servers').split(',')
        chosen_server: str = None

        logging.info('Picking storage server...')

        if len(storage_servers) == 1:
            chosen_server = storage_servers[0]

        # if chosen_server is None:
        #     # Make request to each servers API and pick the one with the most remaining space.
        #     # If space is the same, just pick the first server

        #     for server in storage_servers:
        #         ...

        logging.info('Done. Will use %s!', chosen_server)

        # Grab messages
        messages: dict = request.json

        channel_name: str = messages.get('channel_name')
        archive_name: str = messages.get('archive_name')
        channel_name: str = messages.get('channel_name')
        user_id: str = messages.get('user_id')
        guild_id: str = messages.get('guild_id')

        if not channel_name:
            logging.warning('Missing channel_name')
            return 'missing channel_name', 400

        if not archive_name:
            logging.warning('Missing archive_name')
            return 'missing archive_name', 400

        if not user_id:
            logging.warning('Missing user_id')
            return 'missing user_id', 400

        conn: mariadb.Connection
        cursor: mariadb.Cursor
        conn, cursor = connector_mariadb.connect(get_config('database', 'localdb_ip'), db=get_config('database', 'localdb_name'))

        cursor.execute('SELECT archive_name FROM data WHERE archive_name=%s AND user_id=%s', (archive_name, user_id,))
        archive_exists: Final = cursor.fetchone()
        conn.close()

        if archive_exists is not None:
            logging.warning('Archive already exists under this name')
            return 'Archive already exists under this name', 400

        if not guild_id:
            logging.warning('Missing guild_id')
            return 'missing guild_id', 400

        # Generate passphrase
        generated_passphrase: str = generate_passphrase()
        encryption_key = crypto.generate_key()
        encrypted_messages = crypto.encrypt(messages, encryption_key)

        # Close local db connection, then connect to remote storage server...
        conn, cursor = connector_mariadb.connect(chosen_server)

        if conn is None:
            logging.critical('FAILED TO CONNECT TO BLOCK STORAGE SERVER: %s', location)
            return 'Failed to connect to block storage server', 500

        cursor.execute('INSERT INTO messages VALUES(%s, %s)', (sha256(generated_passphrase.encode()).hexdigest(), encrypted_messages,))
        conn.commit()
        conn.close()

        # Connect to local db
        conn, cursor = connector_mariadb.connect(get_config('database', 'localdb_ip'), db=get_config('database', 'localdb_name'))

        # Hash passphrase, grab encryption key, add location identifier to message
        cursor.execute('INSERT INTO data VALUES (%s, %s, %s, %s, %s, %s)', (user_id, guild_id, archive_name, sha256(generated_passphrase.encode()).hexdigest(), encryption_key, chosen_server,))
        conn.commit()
        conn.close()

        # Return the plain passphrase
        return {
            'passphrase': generated_passphrase
        }

    if request.method == 'DELETE':
        if phrase is None:
            logging.warning('Invalid passphrase')
            return 'invalid passphrase', 401

        conn: mariadb.Connection
        cursor: mariadb.Cursor
        conn, cursor = connector_mariadb.connect(get_config('database', 'localdb_ip'), db=get_config('database', 'localdb_name'))

        # Check passphrase
        cursor.execute('SELECT passphrase FROM data WHERE passphrase=%s', (sha256(phrase.encode()).hexdigest(),))
        hashed_phrase: str = cursor.fetchone()

        if hashed_phrase is None:
            conn.close()
            return 'forbidden', 403

        hashed_phrase = hashed_phrase[0]
        cursor.execute('SELECT encryption_key FROM data WHERE passphrase=%s', (hashed_phrase,))
        encryption_key: str = cursor.fetchone()

        if encryption_key is None:
            # Nothing to delete
            conn.close()
            return 'nothing to delete'

        encryption_key = encryption_key[0]
        cursor.execute('SELECT storage_server FROM data WHERE encryption_key=%s', (encryption_key,))
        location: str = cursor.fetchone()[0]

        # Close connection to local db, then connect to to remote storage server....
        conn.close()
        conn, cursor = connector_mariadb.connect(location)

        if conn is None:
            logging.critical('FAILED TO CONNECT TO BLOCK STORAGE SERVER: %s', location)
            return 'Failed to connect to block storage server', 507

        cursor.execute('DELETE FROM messages WHERE hashed_passphrase=%s', (hashed_phrase,))
        conn.commit()
        conn.close()

        conn, cursor = connector_mariadb.connect(get_config('database', 'localdb_ip'), db=get_config('database', 'localdb_name'))

        cursor.execute('DELETE FROM data WHERE encryption_key=%s', (encryption_key,))
        conn.commit()
        conn.close()

        return {}


def generate_passphrase() -> str:
    '''
    Generates a random passphrase

    Returns:
        str: _description_
    '''

    logging.info('Generating passphrase...')

    phrase = asyncio.run(passphrase.generate())
    hashed_phrase = sha256(phrase.encode()).hexdigest()

    conn: mariadb.Connection
    cursor: mariadb.Cursor
    conn, cursor = connector_mariadb.connect(get_config('database', 'localdb_ip'), db=get_config('database', 'localdb_name'))

    # Get all passphrases
    cursor.execute('SELECT passphrase FROM data')
    passphrase_hashes_db: tuple([list[str]]) = cursor.fetchall()

    logging.info('Checking if passphrase already exists...')

    if passphrase_hashes_db is None:
        return phrase

    conn.close()

    passphrases: list[str] = []

    for p_hash in passphrase_hashes_db:
        passphrases.append(p_hash[0])

    if hashed_phrase in passphrases:
        generate_passphrase()

    logging.info('Done.')

    return phrase
