''' MariaDB Connector '''

import mariadb
import logging
from modules import config


def connect(host: str, db=None) -> tuple[mariadb.Connection|None, mariadb.Cursor]:
    '''
    MariaDB Connector

    Args:
        host (str): IP address of MariaDB server
        db (str): Optional database name. If not provided, pulled from config.ini

    Returns:
        list[mariadb.Connection, mariadb.Cursor]: Connection Object, Cursor Object
    '''

    if db is None:
        db = config.get_config('database', 'mariadb_name')

    logging.info('Connecting to %s...', host)

    try:
        conn: mariadb.Connection = mariadb.connect(
            user=config.get_config('database', 'mariadb_user'),
            password=config.get_config('database', 'mariadb_password'),
            host=host,
            port=int(config.get_config('database', 'mariadb_port')),
            database=db
        )

        cursor: mariadb.Cursor = conn.cursor()
        logging.info('Connection established!')

        return conn, cursor
    except mariadb.Error as error:
        logging.critical('Failed to connect to %s. Reason: %s', host, error)
        return None, error
