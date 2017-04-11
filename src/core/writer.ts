import * as fs from 'fs';
import { Promise } from 'es6-shim';
import { RootObject } from '@core/game_master';
import { Parser } from './parser';

export abstract class Writer {
    gameMaster: RootObject
    constructor(private outputPath: string, private parser: Parser) {
        this.gameMaster = require('../data/GAME_MASTER.json');
    }
    public Write(): Promise<any> {
        let promise = new Promise<any>((resolve, reject) => {
            fs.writeFile(this.outputPath, JSON.stringify(this.parser.Parse(this.gameMaster), null, 4), err => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
        return promise;
    };
}