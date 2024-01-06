""" Generates a random adjective-colour-animal name """

import os
import random

from typing import Final

DIR_PATH: Final = os.path.dirname(os.path.realpath(__file__))


async def generate() -> str:
    """Generates a adjective-colour-animal name

    Returns:
        str: name
    """

    adjectives: list = []
    with open(f'{DIR_PATH}/adjectives.txt', encoding='utf-8') as _f:
        adjectives = _f.readlines()

    animals: list = []
    with open(f'{DIR_PATH}/animals.txt', encoding='utf-8') as _f:
        animals = _f.readlines()

    colours: list = []
    with open(f'{DIR_PATH}/colours.txt', encoding='utf-8') as _f:
        colours = _f.readlines()

    return f'{adjectives[random.randint(0, len(adjectives)-1)].strip()}-{colours[random.randint(0, len(colours)-1)].strip()}-{animals[random.randint(0, len(animals)-1)].strip()}'.lower()  # pylint: disable="C0301"
