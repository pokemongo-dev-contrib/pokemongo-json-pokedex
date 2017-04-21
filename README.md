# pokemongo-json-pokedex

[![ghit.me](https://ghit.me/badge.svg?repo=BrunnerLivio/pokemongo-json-pokedex)](https://ghit.me/repo/BrunnerLivio/pokemongo-json-pokedex)
[![Build Status](https://travis-ci.org/BrunnerLivio/pokemongo-json-pokedex.svg?branch=master)](https://travis-ci.org/BrunnerLivio/pokemongo-json-pokedex)
[![bitHound Overall Score](https://www.bithound.io/github/BrunnerLivio/pokemongo-json-pokedex/badges/score.svg)](https://www.bithound.io/github/BrunnerLivio/pokemongo-json-pokedex)
[![Online Users in pokemongo-json-pokedex Discord Server](https://discordapp.com/api/guilds/295945059927588865/embed.png)](https://discord.gg/VgrtMeZ)


This program transforms the data from the Pokemon GO master files
to a better readable & processable JSON file.

![Philosophie](https://raw.githubusercontent.com/BrunnerLivio/pokemongo-json-pokedex/master/.github/philosophy.png)

As a developer it can be in certain situation quite annoying depend on
the raw GAME MASTER files. Not only are some informations quite hidden
and must be parsed, the structure of the GAME MASTER files can change
after every version. pokemongo-json-pokedex parses the GAME
MASTER data and tries to maintain the same structure, even when the
structure of the source files changed completely.

## Prerequisites

- [NodeJS](https://nodejs.org/en/)
- [Git](https://git-scm.com/)

## Installation


1. Clone the repository and change directory to the cloned repository.
2. Run `npm install` to install the dependencies
3. Run `npm start` to run the script
4. The generated data is in the `output`-folder

## Scripts
### fetch-game-master
Get the latest GAME_MASTER file from the [pokemongo-game-master repository](https://github.com/BrunnerLivio/pokemongo-game-master)
```
npm run fetch-game-master
```
### docs
Generate documentation 
```
npm run docs
```

## Documentation

[Models](https://github.com/BrunnerLivio/pokemongo-json-pokedex/blob/master/.github/model.md)

[HTML Documentation (for Developers)](https://brunnerlivio.github.io/pokemongo-json-pokedex/)
### Generate

See [Scripts > docs](#docs)

## Contribute


### Commits
We use [this standard](https://github.com/erlang/otp/wiki/Writing-good-commit-messages). Please use this, otherwise it won't be accepted.

## Changelog

See [CHANGELOG.md](https://github.com/BrunnerLivio/pokemongo-json-pokedex/blob/master/CHANGELOG.md)

## Docker

You can build the docker container using
```
docker build --pull -t $USER/pokemongo-json-pokedex . 
```