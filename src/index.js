import fs from 'fs';
import Normalizer from './normalizer';

fs.readFile('src/assets/raw.json', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    Normalizer.Normalize(JSON.parse(data));
});