const https = require('https');
const fs = require('fs');
const path = require('path');
const pokemongoGameMaster = require('pokemongo-game-master');
const chalk = require('chalk');

const latestGameMasterPath = 'https://raw.githubusercontent.com/BrunnerLivio/pokemongo-game-master/master/versions/latest/GAME_MASTER.json';
const latestVersionPath = 'https://raw.githubusercontent.com/BrunnerLivio/pokemongo-game-master/master/versions/latest-version.txt';

const dir = path.join(__dirname, '../src/data');
const file = path.join(dir, 'GAME_MASTER.json');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}


var fileStream = fs.createWriteStream(file);
pokemongoGameMaster.getVersion('latest', 'json').then(gameMaster => {
    pokemongoGameMaster.getLatestVersionName().then(version => {
        gameMaster.version = version;
        fs.writeFileSync(file, JSON.stringify(gameMaster, null, 4));
        console.log(`${chalk.blue('i')} Successfully fetched GAME_MASTER.json v${version} to ${chalk.blue(file)}`);
    });
});
