''' Helper module, used to read config.ini '''

import configparser

def get_config(section: str, key: str|None = None):
    """Gets configuration section/key from config.ini

    Args:
        section (str): section name
        key (str, optional): key. Defaults to None, and returns dict.

    Returns:
        dict|str: Configuration item
    """

    config: configparser.RawConfigParser = configparser.RawConfigParser()
    config.read('./config.ini')

    configuration: dict = dict(config.items(section))

    if key is None:
        return configuration

    return configuration.get(key)
