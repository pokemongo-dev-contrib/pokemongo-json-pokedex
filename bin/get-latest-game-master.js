var https = require('https');
var fs = require('fs');
var path = require('path');

var latestGameMasterPath = 'https://raw.githubusercontent.com/BrunnerLivio/pokemongo-game-master/master/versions/latest/GAME_MASTER.json';
var dir = path.join(__dirname, '../src/data');
var file = path.join(dir, 'GAME_MASTER.json');
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
}


var file = fs.createWriteStream(file);
var request = https.get(latestGameMasterPath, function (response) {
	response.pipe(file);
});
