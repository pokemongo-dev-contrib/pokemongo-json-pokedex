"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var pokemon_1 = require("./components/pokemon");
var gameMasterContent = fs.readFile('./src/data/GAME_MASTER.json', 'utf8', function (err, data) {
    var gameMaster = JSON.parse(data);
    new pokemon_1.PokemonParser(gameMaster).parse();
});
//# sourceMappingURL=index.js.map