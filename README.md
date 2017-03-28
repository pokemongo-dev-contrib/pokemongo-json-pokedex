# pokemongo-data-normalizer

[![ghit.me](https://ghit.me/badge.svg?repo=BrunnerLivio/pokemongo-data-normalizer)](https://ghit.me/repo/BrunnerLivio/pokemongo-data-normalizer)
[![Build Status](https://travis-ci.org/BrunnerLivio/pokemongo-data-normalizer.svg?branch=master)](https://travis-ci.org/BrunnerLivio/pokemongo-data-normalizer)
[![bitHound Overall Score](https://www.bithound.io/github/BrunnerLivio/pokemongo-data-normalizer/badges/score.svg)](https://www.bithound.io/github/BrunnerLivio/pokemongo-data-normalizer)
[![Online Users in pokemongo-data-normalizer Discord Server](https://discordapp.com/api/guilds/295945059927588865/embed.png)](https://discord.gg/VgrtMeZ)


This program transforms the data from the Pokemon GO master files
to a better readable & processable JSON file.

# Prerequisites

- [NodeJS](https://nodejs.org/en/)
- [Git](https://git-scm.com/)

# Installation


1. Clone the repository and change directory to the cloned repository.
2. Run `npm install` to install the dependencies
3. Run `npm start` to run the script
4. The generated data is in the `output`-folder

# Scripts
## fetch-game-master
Get the latest GAME_MASTER file from the [pokemongo-game-master repository](https://github.com/BrunnerLivio/pokemongo-game-master)
```
npm run fetch-game-master
```
## docs
Generate documentation 
```
npm run docs
```

# Documentation

[Live-demo](https://brunnerlivio.github.io/pokemongo-data-normalizer/)

## Generate

See [Scripts > docs](#docs)

# Contribute


## Commits
We use [this standard](https://github.com/erlang/otp/wiki/Writing-good-commit-messages). Please use this, otherwise it won't be accepted.

# Docker

You can build the docker container using
```
docker build --pull -t $USER/pokemongo-data-normalizer . 
```