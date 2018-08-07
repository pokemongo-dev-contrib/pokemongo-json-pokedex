const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const request = require('request');
const { forEachSeries } = require('p-iteration');
const csv = require('csvtojson');

const dir = path.join(__dirname, '../src/data');
const FETCH_URL = 'https://raw.githubusercontent.com/ZeChrales/PogoAssets/master/';
const files = [
    {
        from: 'decrypted_assets/pokemon.txt',
        to: 'POKEMON_TRANSLATIONS.json',
        csv: true
    },
    {
        from: 'decrypted_assets/moves.txt',
        to: 'MOVES_TRANSLATIONS.json',
        csv: true
    },
    {
        from: 'decrypted_assets/items.txt',
        to: 'ITEMS_TRANSLATIONS.json',
        csv: true
    }
];

const csvSettings = { delimiter: '\t' };

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const downloadFile = (file) => {
    return new Promise((resolve, reject) => {
        request.get(`${FETCH_URL}/${file.from}`, (error, response, body) => {
            if (response.body === '404: Not Found\n') return reject(new Error('Given version could not be found.'));
            if (error) return reject(error);
            resolve(body);
        });
    });
};

const getParsedFileContent = async file => {
    let content = await downloadFile(file);
    if (file.csv) {
        content = await csv(csvSettings).fromString(content);
        content = JSON.stringify(content, null, 4)
    }
    return content;
};
const writeToFile = (content, file) => {
    const newFilePath = path.join(dir, file.to);
    fs.writeFileSync(newFilePath, content);
    console.log(`${chalk.blue('i')} Successfully fetched ${chalk.blue(file.from)} to ${chalk.blue(file.to)}`);
};

const fetch = async () => {
    await forEachSeries(files, async file => {
        try {
            const content = await getParsedFileContent(file);
            writeToFile(content, file);
        }
        catch (error) {
            console.error(error);
        }
    });
};

fetch();

