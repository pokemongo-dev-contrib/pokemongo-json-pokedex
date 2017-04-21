const https = require('https');
const fs = require('fs');
const path = require('path');

const latestGameMasterPath = 'https://raw.githubusercontent.com/BrunnerLivio/pokemongo-game-master/master/versions/latest/GAME_MASTER.json';
const latestVersionPath = 'https://raw.githubusercontent.com/BrunnerLivio/pokemongo-game-master/master/versions/latest-version.txt';

const dir = path.join(__dirname, '../src/data');
const file = path.join(dir, 'GAME_MASTER.json');
const latestVersionFile = path.join(dir, '.json');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}


var fileStream = fs.createWriteStream(file);
https.get(latestGameMasterPath, (response) => {
    let gameMasterData = '';
    response.on('data', (d) => {
        gameMasterData += d.toString('utf8');
    });
    response.on('end', () => {
        let gameMaster = JSON.parse(gameMasterData);
        https.get(latestVersionPath, (response) => {
            response.on('data', (d) => {
                gameMaster.version = d.toString('utf8');
                fs.writeFileSync(file, JSON.stringify(gameMaster));
            });
        });
    });
});
