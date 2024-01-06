""" Discord Archive Bot Message management service """

import os
import datetime
import logging
from typing import Final

from modules.connectors import connector_mariadb
from modules.config import get_config

from flask import Flask
from flask_cors import CORS
from flask_compress import Compress

from blueprints.v1 import V1

API_VERSION: Final[str] = '1.0.0' # SemVer
DIR_PATH: Final[str] = os.path.dirname(os.path.realpath(__file__))

app = Flask(__name__)
Compress(app)

app.register_blueprint(V1, url_prefix='/v1')
cors = CORS(app, resources={r"*": {"origins": "*"}})


@app.route('/')
def health_check() -> dict:
    """Health check

    Returns:
        dict: {}
    """

    return {}


def setup_logging():
    ''' Set up logging formatting and output'''

    # These are constants, so we'll
    # pylint: disable=C0103
    DATE_FORMAT: Final[str] = '%Y-%m-%d %H:%M:%S'
    LOG_FORMAT: Final[str] = '%(asctime)s - %(levelname)s - %(message)s - (%(filename)s)'

    # Create logger
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)

    log_date: str = datetime.datetime.now().strftime('%Y-%m-%d')

    # Create logs directory, if it doesn't exist
    if not os.path.isdir('logs'):
        os.mkdir('logs')

    # Create file handler
    file_handler = logging.FileHandler(f'./logs/{log_date}.log', encoding='UTF-8')
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(logging.Formatter(fmt=LOG_FORMAT, datefmt=DATE_FORMAT))

    # Create stream handler
    stream_handler = logging.StreamHandler()
    stream_handler.setLevel(logging.DEBUG)
    stream_handler.setFormatter(logging.Formatter(fmt=LOG_FORMAT, datefmt=DATE_FORMAT))

    # Add handlers to logger
    logger.addHandler(file_handler)
    logger.addHandler(stream_handler)

    # Log startup message
    logger.info('Started Archive Bot API v%s', (API_VERSION))


def init_db():
    ''' DB initialiser. Verifies existence of required tables, and creates anything that is missing. '''

    logging.info('Initialising database...')

    conn, cursor = connector_mariadb.connect(host=get_config('database', 'localdb_ip'), db=get_config('database', 'localdb_name'))

    cursor.execute('create table if not exists data (user_id text, guild_id text, archive_name text, passphrase text, encryption_key text, storage_server text)')
    conn.commit()
    conn.close()

    logging.info('Done!')


setup_logging()
init_db()
