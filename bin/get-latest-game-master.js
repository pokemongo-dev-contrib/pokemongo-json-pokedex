const fs = require('fs');
const path = require('path');
const pokemongoGameMaster = require('pokemongo-game-master');
const chalk = require('chalk');
const dir = path.join(__dirname, '../src/data');
const file = path.join(dir, 'GAME_MASTER.json');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}


pokemongoGameMaster.getVersion('latest', 'json').then(gameMaster => {
    pokemongoGameMaster.getLatestVersionName().then(version => {
        gameMaster.version = version;
        fs.writeFileSync(file, JSON.stringify(gameMaster, null, 4));
        console.log(`${chalk.blue('i')} Successfully fetched GAME_MASTER.json v${version} to ${chalk.blue(file)}`);
    });
});
