import * as path from 'path';

import APP_SETTINGS from '@settings/app';
import { Writer } from '@core/writer';
import { TypeParser } from './';

export class TypeWriter extends Writer {
    constructor() {
        let outputPath: string = path.join(
            APP_SETTINGS.OUTPUT_PATH,
            APP_SETTINGS.TYPE_FILE
        );
        super(outputPath, new TypeParser());
    }
}
