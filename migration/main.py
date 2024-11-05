import sys
import ast
import os
import uuid
import json
from datetime import datetime

from dotenv import load_dotenv
from cryptography.fernet import Fernet
import mariadb
from multiprocessing import Pool
from tqdm import tqdm


def connect(host: str, database: str) -> mariadb.Connection:
    '''
    Connect to MariaDB database

    Args:
        host (str): IP address of MariaDB server
        database (str): Name of database to connect to

    Returns:
        mariadb.Connection: Connection object

    Raises:
        SystemExit: If unable to connect to the database
    '''

    try:
        conn = mariadb.connect(
            host=host,
            database=database,
            port=3306,
            user='archivebot',
            password=os.getenv('DB_PASSWORD')
        )
        return conn
    except mariadb.Error as error:
        print(f'Failed to connect to {database} database on {host}.')
        print(f'Error: {error}')
        sys.exit()


def decrypt(encrypted_data: str, encryption_key: str) -> str:
    '''
    Decrypt encrypted string using Fernet encryption key

    Args:
        encrypted_data (str): Encrypted string
        encryption_key (str): Fernet encryption key

    Returns:
        str: Decrypted string
    '''

    fernet: any = Fernet(encryption_key)
    decrypted_messages: str = fernet.decrypt(encrypted_data.encode()).decode()
    return decrypted_messages


def migrate_archive(archive: dict) -> tuple:
    migrated_archives: int = 0
    total_message_count: int = 0

    # Extract necessary data from the archive
    archive_name: str = archive.get('name')
    archive_user: str = archive.get('user')
    messages: dict = ast.literal_eval(archive.get('decrypted_data'))
    guild: str = messages.get('guild_name')
    guild_id: str = messages.get('guild_id')
    channel: str = messages.get('channel_name')
    messages_len: int = len(messages.get('messages'))

    # Connect to the destination database
    with connect('194.164.20.136', 'abnext') as conn:
        cur = conn.cursor()

        # Check if the archive already exists
        cur.execute(
            'SELECT EXISTS(SELECT 1 FROM archives WHERE user_id=%s AND name=%s)',
            (archive_user, archive_name)
        )
        exists = cur.fetchone()[0]

        if exists or messages_len == 0:
            return migrated_archives, total_message_count

        # Insert archive metadata into the database
        cur.execute(
            'INSERT IGNORE INTO archives(server_id, uuid, server_name, channel_name, user_id, name, created_at) VALUES (%s, %s, %s, %s, %s, %s, %s)',
            (
                guild_id,
                str(uuid.uuid4()),
                guild,
                channel,
                archive_user,
                archive_name,
                datetime.fromtimestamp(messages.get('messages')[-1].get('date') / 1000).isoformat()
            )
        )
        conn.commit()

        archive_id: int = cur.lastrowid
        total_message_count += messages_len
        migrated_archives += 1

        # Prepare message data for insertion
        message_data = [
            (
                archive_id,
                message.get('id'),
                message.get('author'),
                message.get('author_id'),
                message.get('avatar_hash'),
                json.dumps({
                    'attachments': message.get('attachments'),
                    'content': message.get('content'),
                    'mentions': message.get('mentions'),
                    'reactions': message.get('reactions')
                }),
                datetime.fromtimestamp(message.get('date') / 1000).isoformat()
            )
            for message in messages.get('messages')
        ]

        # Insert messages into the database
        cur.executemany(
            'INSERT INTO messages(archive_id, message_id, author, author_id, avatar_hash, content, created_at) VALUES (%s, %s, %s, %s, %s, %s, %s)',
            message_data
        )
        conn.commit()

    return migrated_archives, total_message_count


def main() -> None:
    """Migrated existing archives to new DB schema

    Migrates existing archives from the old `archivebot` database to the new
    `abnext` database.

    The function takes no arguments and returns `None`.

    The function does the following:

    1. Connects to the `archivebot` database and gets the archive metadata
    2. Connects to the `archiveslux` database and gets the archives
    3. Decrypts the archives using the encryption key
    4. Migrates the archive over to the `abnext` database
    """

    archives: dict = {}

    # Get archive metadata
    with connect('plsr.uk', 'archivebot') as conn:
        print('Downloading metadata...')
        cur: mariadb.Cursor = conn.cursor()
        cur.execute('SELECT user_id, archive_name, passphrase, encryption_key FROM data')
        result: list = cur.fetchall()

        for [user_id, archive_name, passphrase, encryption_key] in result:
            archives[passphrase] = {
                'user': user_id,
                'name': archive_name,
                'key': encryption_key
            }

    # Get archives
    with connect('194.164.20.136', 'archiveslux') as conn:
        print('Downloading archives...')
        cur: mariadb.Cursor = conn.cursor()
        cur.execute('SELECT hashed_passphrase, json FROM messages')
        result: list = cur.fetchall()

        for [passphrase, json_data] in result:
            archives[passphrase]['encrypted_data'] = json_data

    print()

    for archive in tqdm(archives.values(), desc='Decrypting', unit='archive', total=len(archives)):
        if 'encrypted_data' in archive.keys():
            archive['decrypted_data'] = decrypt(archive.get('encrypted_data').decode(), archive.get('key'))
            archive.pop('encrypted_data')  # Remove the encrypted data after decryption, frees up some memory

    archives_to_migrate = [archive for archive in archives.values() if 'decrypted_data' in archive.keys()]

    # Use multiprocessing to migrate archives
    with Pool() as pool:
        results = list(tqdm(pool.imap_unordered(migrate_archive, archives_to_migrate), desc='Migrating', unit='archive', total=len(archives_to_migrate)))

    print()

    migrated_archives = sum(result[0] for result in results)
    total_message_count = sum(result[1] for result in results)

    if migrated_archives < len(archives_to_migrate) and migrated_archives > 0:
        print(f'{len(archives_to_migrate) - migrated_archives}/{len(archives_to_migrate)} archives did not need to be migrated.')

    print(f'Migrated {migrated_archives} archives, and {total_message_count} messages!' if migrated_archives > 0 else 'No new archives to migrate!')

if __name__ == '__main__':
    load_dotenv()
    main()
