import sys
import ast
import os
import uuid
import json
from datetime import datetime
from dotenv import load_dotenv
from cryptography.fernet import Fernet
import mariadb

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

    print('Grabbing metadata...')

    # Get archive metadata
    with connect('plsr.uk', 'archivebot') as conn:
        cur = conn.cursor()
        cur.execute('SELECT user_id, archive_name, passphrase, encryption_key FROM data')
        result: list = cur.fetchall()

        for [user_id, archive_name, passphrase, encryption_key] in result:
            archives[passphrase] = {
                'user': user_id,
                'name': archive_name,
                'key': encryption_key
            }

    print('Getting archives...')
    # Get archives
    with connect('194.164.20.136', 'archiveslux') as conn:
        cur = conn.cursor()
        cur.execute('SELECT hashed_passphrase, json FROM messages')
        result: list = cur.fetchall()

        for [passphrase, json_data] in result:
            archives[passphrase]['encrypted_data'] = json_data

    for archive in archives.values():
        if 'encrypted_data' in archive.keys():
            archive['decrypted_data'] = decrypt(archive.get('encrypted_data').decode(), archive.get('key'))

    archives_to_migrate = [archive for archive in archives.values() if 'decrypted_data' in archive.keys()] # These are archives made post the fran-fuck-aggedon
    print(f'Found {len(archives_to_migrate)} archives to migrate.')

    migrated_archives = 0
    total_message_count = 0

    # Finally, migrate the archive over
    print('Running migration...')
    with connect('194.164.20.136', 'abnext') as conn:
        cur = conn.cursor()

        for archive in archives_to_migrate:
            # Verify the archive doesn't already exist
            cur.execute(
                'SELECT count(*) FROM archives WHERE server_id=%s AND user_id=%s AND name=%s',
                    (
                        ast.literal_eval(archive.get('decrypted_data')).get('guild_id'),
                        archive.get('user'),
                        archive.get('name')
                    )
                )

            exists: int = cur.fetchone()[0]

            if (exists > 0):
                continue

            migrated_archives += 1
            print(f'Migrating: {ast.literal_eval(archive.get("decrypted_data")).get("guild_name")}/{archive.get("name")}...')

            cur.execute(
                'INSERT IGNORE INTO archives(server_id, uuid, server_name, channel_name, user_id, name, created_at) VALUES (%s, %s, %s, %s, %s, %s, %s)',
                (
                    ast.literal_eval(archive.get('decrypted_data')).get('guild_id'),
                    str(uuid.uuid4()),
                    ast.literal_eval(archive.get('decrypted_data')).get('guild_name'),
                    ast.literal_eval(archive.get('decrypted_data')).get('channel_name'),
                    archive.get('user'),
                    archive.get('name'),
                    datetime.fromtimestamp(ast.literal_eval(archive.get('decrypted_data')).get('messages')[-1].get('date') / 1000).isoformat()
                )
            )
            conn.commit()

            archive_id: int = cur.lastrowid
            messages: dict = ast.literal_eval(archive.get('decrypted_data'))
            total_message_count += len(messages.get('messages'))

            print(f'  - Processing {len(messages.get("messages"))} messages...')

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

            print('  - Committing to database...')

            cur.executemany(
                'INSERT INTO messages(archive_id, message_id, author, author_id, avatar_hash, content, created_at) VALUES (%s, %s, %s, %s, %s, %s, %s)',
                message_data
            )
            conn.commit()

            print('  - Done.')

    print(f'\nMigrated {migrated_archives} archives, and {total_message_count} messages!' if migrated_archives > 0 else '\nNo new archives to migrate!')


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


if __name__ == '__main__':
    load_dotenv()
    main()