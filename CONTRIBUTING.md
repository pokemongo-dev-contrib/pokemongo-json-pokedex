# Contribute

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

Get the latest GAME_MASTER file from the [pokemongo-game-master repository](https://github.com/pokemongo-dev-contrib/pokemongo-game-master)

```bash

npm run fetch-game-master

```

## Commits

We use [this standard](https://github.com/erlang/otp/wiki/Writing-good-commit-messages).
Please use this, otherwise it won't be accepted.

## Docker

It is possible to generate the data inside of a Docker container, so you do not
need to download the dependencies on your local machine.

```bash

docker build -t $USER/pokemongo-json-pokedex .
docker run -v "$(pwd)/out:/var/lib/pokemongo-json-pokedex/output" -it $USER/pokemongo-json-pokedex
# You can find the output in the "out" folder
ls out/

```
