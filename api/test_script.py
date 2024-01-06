''' pyTest API Test Script '''

import sys
import os
import json
from typing import Final

import pytest

root_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "."))
sys.path.insert(0, root_path)

# pylint: disable=C0413
from microservice.app import app

from microservice.modules.connectors import connector_mariadb
from microservice.modules.config import get_config


USER_ID: Final = '0000'
GUILD_ID: Final = '1111'


def clean_up():
    ''' Clean up method - removes traces of test archives '''

    conn, cursor = connector_mariadb.connect(get_config('database', 'localdb_ip'), db=get_config('database', 'localdb_name'))

    assert conn is not None

    # Get all passphrases from test user
    cursor.execute('SELECT passphrase FROM data WHERE user_id=%s',(USER_ID,))
    passphrases: tuple = cursor.fetchall()
    conn.close()

    # Delete archives...
    # Pick storage server
    storage_servers: dict = get_config('storage')
    storage_servers: list = storage_servers.get('servers').split(',')
    chosen_server: str = None

    if len(storage_servers) == 1:
        chosen_server = storage_servers[0]

    conn,cursor = connector_mariadb.connect(chosen_server)

    if passphrases is not None:
        for phrase in passphrases:
            cursor.execute('DELETE FROM messages WHERE hashed_passphrase=%s', (phrase))
            conn.commit()

    conn.close()

    # Now delete keys...
    conn, cursor = connector_mariadb.connect(get_config('database', 'localdb_ip'), db=get_config('database', 'localdb_name'))
    cursor.execute('DELETE FROM data WHERE user_id=%s', (USER_ID,))
    conn.commit()
    conn.close()


@pytest.fixture
def client():
    '''
    Pytest fixture that provides a test client for the Flask application.

    This fixture sets up the Flask application's testing environment by setting `app.testing` to True.
    It then creates a test client using `app.test_client()` and yields it to the test function.

    Yields:
        flask.testing.FlaskClient: A test client for the Flask application.

    Example:
        def test_my_endpoint(client):
            response = client.get('/my-endpoint')
            assert response.status_code == 200
            assert response.json == {'message': 'Success'}
    '''

    app.testing = True

    with app.test_client() as c:
        yield c


def test_start():
    ''' Run cleanup method on test start '''

    clean_up()


def test_list_archives(client):
    ''' Test list archive endpoint '''

    response = client.get(f'/v1/archives/{USER_ID}')
    assert response.status_code == 200

    response_data: dict = json.loads(response.data)

    expected_response: dict = {
       "archives": []
    }

    assert response_data == expected_response
    assert len(response_data['archives']) == 0


def test_make_new_archive(client):
    ''' Attempt to create a new archive, and test duplicated archive name check '''

    sample_archive: dict = {
        "archive_name": "api-test",
        "channel_name": "api-test",
        "guild_id": GUILD_ID,
        "guild_name": "PyTest!",
        "messages": [
            {
                "attachments": [],
                "author": "API TEST",
                "author_id": USER_ID,
                "avatar_hash": f"a_${USER_ID}",
                "content": "Hello, world! I'm testing the API!",
                "date": 1617600674421,
                "id": USER_ID,
                "reactions": []
            }
        ],
        "user_id": USER_ID
    }

    client_secret: str = get_config('auth', 'clientsecret')

    response = client.post('/v1/messages', json=sample_archive, headers={'Authorization': client_secret})
    assert response.status_code == 200

    # Verify archive exists...
    response = client.get(f'/v1/archives/{USER_ID}')
    assert response.status_code == 200

    # ... we verify this by checking that the test user has a single archive.
    response_data: dict = json.loads(response.data)
    assert len(response_data['archives']) == 1

    # Now try creating an again, we should see that the archive already exists under this name.
    response = client.post('/v1/messages', json=sample_archive, headers={'Authorization': client_secret})
    assert response.status_code == 400


PASSPHRASE: str = None

def test_reset_passphrase(client):
    ''' Test reset passphrase endpoint '''

    # Simplest way to share passphrase. So we disable the warning.
    global PASSPHRASE # pylint: disable=W0603

    request_data: dict = {
        'archive_name': 'api-test',
        'user_id': USER_ID
    }

    client_secret: str = get_config('auth', 'clientsecret')

    response = client.post('/v1/archives', json=request_data, headers={'Authorization': client_secret})
    assert response.status_code == 200
    assert 'passphrase' in response.json

    PASSPHRASE = response.json['passphrase']


def test_delete_archive(client):
    ''' Test delete archive endpoint '''

    client_secret: str = get_config('auth', 'clientsecret')

    response = client.delete(f'/v1/messages/{PASSPHRASE}', headers={'Authorization': client_secret})
    assert response.status_code == 200

    # Verify archive no longer exists...
    response = client.get(f'/v1/archives/{USER_ID}')
    assert response.status_code == 200

    # ... we verify this by checking that the test user has a zero archives.
    response_data: dict = json.loads(response.data)
    assert len(response_data['archives']) == 0


def test_finish():
    ''' Clean up after test is finished '''

    clean_up()
