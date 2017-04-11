import * as path from 'path';
import * as fs from 'fs';
import * as chalk from 'chalk';
import { Promise } from 'es6-shim';

import APP_SETTINGS from '@settings/app';
import { Writer } from '@core/writer';
import { PokemonParser } from './';

export class PokemonWriter extends Writer {
    constructor() {
        let outputPath: string = path.join(
            APP_SETTINGS.OUTPUT_PATH,
            APP_SETTINGS.POKEMON_FILE
        );
        super(outputPath, new PokemonParser());
    }
}