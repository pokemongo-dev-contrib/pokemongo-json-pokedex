import * as path from 'path';

import { Promise } from 'es6-shim';

import APP_SETTINGS from '@settings/app';
import { Writer } from '@core/writer';
import { AvatarCustomizationParser } from './avatar-customization.parser';

export class AvatarCustomizationWriter extends Writer {
    constructor() {
        let outputPath: string = path.join(
            APP_SETTINGS.OUTPUT_PATH, APP_SETTINGS.AVATAR_CUSTOMIZATION_FILE
        );
        super(outputPath, new AvatarCustomizationParser());
    }
}