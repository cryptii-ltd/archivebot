''' Fernet wrapper. Encrypts/Decrypts data, and generates keys '''

import logging


from cryptography.fernet import Fernet


def encrypt(plain_data: str, encryption_key: bytes) -> str:
    '''
    Encrypt plain string data using Fernet encryption key

    Args:
        plain_data (str): Plain string
        encryption_key (bytes): Fernet encryption key

    Returns:
        str: Encrypted string
    '''

    # Initialise Fernet instance using encryption key
    fernet: any = Fernet(encryption_key)

    # Finally, encrypt messages
    logging.info('Encrypting messages...')
    encrypted_messages = fernet.encrypt(str(plain_data).encode())
    encrypted_messages = encrypted_messages.decode()

    logging.info('Done.')

    return encrypted_messages


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

    logging.info('Decrypting messages...')
    decrypted_messages: str = fernet.decrypt(encrypted_data.encode()).decode()

    logging.info('Done.')

    return decrypted_messages


def generate_key() -> bytes:
    '''
    Generate a Fernet encryption key

    Returns:
        bytes: Encryption key
    '''

    return Fernet.generate_key()
