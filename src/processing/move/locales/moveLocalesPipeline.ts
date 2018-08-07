import { Translation } from '@income/index';
import * as leftPad from 'left-pad';
import { LocalesPipeline } from '@core/pipeline/localePipeline';
import { Move, MoveLocalTranslations } from '@outcome/move';

export class MoveLocalesPipeline extends LocalesPipeline<Move, MoveLocalTranslations> {
    constructor(
        translations: Translation[],
        entities: Move[],
        locales: string[]) {
        super(translations, entities, locales, move => move.id);
    }

    async mapData(translation: MoveLocalTranslations, move: Move, localeName: string) {
        const leftPaddedDex = leftPad(move.internalId, 4, '0');
        translation.name = this.generateLocaleByKey(`move_name_${leftPaddedDex}`, localeName)
        return translation;
    }
}
