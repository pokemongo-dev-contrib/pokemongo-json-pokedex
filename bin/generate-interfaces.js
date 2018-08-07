const JsonToTS = require('json-to-ts');
const fs = require('fs-promise');
const chalk = require('chalk');
const path = require('path');
const { forEachSeries } = require('p-iteration');


const FILES = [{
    input: 'src/data/GAME_MASTER.json',
    output: 'src/income/gameMaster.ts',
    rootObjectName: 'RootObject'
}, {
    input: 'src/data/ITEMS_TRANSLATIONS.json',
    output: 'src/income/translation.ts',
    rootObjectName: 'Translation'
}];



const generate = async (fileMetadata) => {
    const INPUT_PATH = path.join(__dirname, '..', fileMetadata.input);
    const OUTPUT_PATH = path.join(__dirname, '..', fileMetadata.output);

    const data = await fs.readFile(INPUT_PATH);

    let gameMasterTs = '';
    JsonToTS(JSON.parse(data)).forEach(interf => {
        gameMasterTs += 'export ' + interf.replace('RootObject', fileMetadata.rootObjectName) + '\n';
    });

    await fs.writeFile(OUTPUT_PATH, gameMasterTs);
};

forEachSeries(FILES, async file => {
    try {
        generate(file);
    }
    catch (error) {
        console.error(error);
    }
    console.log(`${chalk.blue('i')} Successfully written TypeScript interfaces to ${chalk.blue(file.output)}`);
});

