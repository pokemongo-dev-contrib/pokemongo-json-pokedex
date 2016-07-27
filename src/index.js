import fs from 'fs';
import Normalizer from './normalizer';

fs.readFile('src/assets/raw.json', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }


    fs.readFile('src/assets/output.json', 'utf8', function (err, dataDataGraber) {
        if (err) {
            return console.log(err);
        }
        Normalizer.Normalize(JSON.parse(data), JSON.parse(dataDataGraber));

    });
});