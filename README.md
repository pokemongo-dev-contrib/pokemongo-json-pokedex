# pokemongo-json-pokedex

[![Build Status](https://travis-ci.org/pokemongo-dev-contrib/pokemongo-json-pokedex.svg?branch=master)](https://travis-ci.org/pokemongo-dev-contrib/pokemongo-json-pokedex)
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

git clone https://github.com/pokemongo-dev-contrib/pokemongo-json-pokedex.git

# Go to the assets
cd pokemongo-json-pokedex/output
ls
# ➜ avatar-customization.json  item.json  locales  move.json  pokemon.json  type.json

```

or you can use it with npm using `npm install pokemongo-json-pokedex`

```JavaScript

const pokemon = require('pokemongo-json-pokedex/output/pokemon.json');
const move = require('pokemongo-json-pokedex/output/move.json');
const type = require('pokemongo-json-pokedex/output/type.json');
const avatarCustomization = require('pokemongo-json-pokedex/output/avatar-customization.json');
const items = require('pokemongo-json-pokedex/output/item.json');

```

You can read about the output-data inside the [documentation](.github/model.md).

## Translations

The translation files follow the [i18next Guidelines](https://www.i18next.com/). The translation files can be found in the [output/locales folder](https://github.com/pokemongo-dev-contrib/pokemongo-json-pokedex/tree/master/output/locales). You can find an example with NodeJS and the i18next client library
in the [samples folder](https://github.com/pokemongo-dev-contrib/pokemongo-json-pokedex/tree/master/samples/01_simple_translations)

## More Links

- [Samples](https://github.com/pokemongo-dev-contrib/pokemongo-json-pokedex/tree/master/samples)
- [The pokemongo-game-master repository](https://github.com/pokemongo-dev-contrib/pokemongo-game-master)
- [The PogoAssets repository](https://github.com/ZeChrales/PogoAssets)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Latest Changelog](CHANGELOG.md)
