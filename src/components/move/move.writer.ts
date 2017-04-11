import * as path from 'path';

import { Promise } from 'es6-shim';

import APP_SETTINGS from '@settings/app';
import { Writer } from '@core/writer';
import { MoveParser } from './';

export class MoveWriter extends Writer {
    constructor() {
        let outputPath: string = path.join(
            APP_SETTINGS.OUTPUT_PATH, APP_SETTINGS.MOVE_FILE
        );
        super(outputPath, new MoveParser());
    }
}