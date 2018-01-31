const JsonToTS = require('json-to-ts');
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');


const INPUT_PATH = path.join(__dirname, '../src/data/GAME_MASTER.json');
const OUTPUT_PATH = path.join(__dirname, '../src/income/gameMaster.ts');

fs.readFile(INPUT_PATH, (err, data) => {
    if (err) {
        throw err;
    }

    let gameMasterTs = '';
    JsonToTS(JSON.parse(data)).forEach(interf => {
        gameMasterTs += 'export ' + interf + '\n\n';
    });

    fs.writeFile(OUTPUT_PATH, gameMasterTs, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log(`${chalk.blue('i')} Successfully written TypeScript interfaces to ${chalk.blue(OUTPUT_PATH)}`);

    });
});
