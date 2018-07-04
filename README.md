# pokemongo-json-pokedex

[![Build Status](https://travis-ci.org/BrunnerLivio/pokemongo-json-pokedex.svg?branch=master)](https://travis-ci.org/BrunnerLivio/pokemongo-json-pokedex)
[![Online Users in pokemongo-json-pokedex Discord Server](https://discordapp.com/api/guilds/295945059927588865/embed.png)](https://discord.gg/VgrtMeZ)

This program transforms the data from the Pokemon GO master files
to a better readable & processable JSON file.

![Philosophy](https://raw.githubusercontent.com/BrunnerLivio/pokemongo-json-pokedex/master/.github/philosophy.png)

## Purpose

As a developer it can be in certain situation quite annoying depend on
the raw [GAME MASTER](https://github.com/pokemongo-dev-contrib/pokemongo-game-master) files.
Not only are some informations quite hidden
and must be parsed, the structure of the GAME MASTER files can change
after every version. **pokemongo-json-pokedex** parses the GAME
MASTER data and tries to maintain the same structure, even when the
structure of the source files changed completely.

## Getting Started

You can get the latest version by executing the following command in your shell.
Make sure you have `wget` installed

```bash

# Downloads the latest Pokemon data and saves it to the file pokemon.json
wget https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-json-pokedex/master/output/pokemon.json
# Downloads the latest Move data and saves it to the file move.json
wget https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-json-pokedex/master/output/move.json
# Downloads the latest Type data and saves it to the file type.json
wget https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-json-pokedex/master/output/type.json
# Downloads the latest Avatar Customization data and saves it to the file avatar-customization.json
wget https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-json-pokedex/master/output/avatar-customization.json

```

You can read about the output-data inside the [documentation](.github/model.md).

## More Links

- [The pokemongo-game-master repository](https://github.com/pokemongo-dev-contrib/pokemongo-game-master)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Latest Changelog](CHANGELOG.md)
