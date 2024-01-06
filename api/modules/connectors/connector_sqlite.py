''' sqlite3 Connector '''

import sqlite3
import os


def connect() -> tuple[sqlite3.Connection, sqlite3.Cursor]:
    """SQlite3 connector

    Returns:
        list[sqlite3.Connection, sqlite3.Cursor]: Connection and Cursor object.
    """

    if not os.path.exists('./database'):
        os.mkdir('./database')

    conn: sqlite3.Connection = sqlite3.connect('./database/data.db')
    cursor: sqlite3.Cursor = conn.cursor()

    return conn, cursor
