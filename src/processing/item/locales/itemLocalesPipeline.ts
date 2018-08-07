import { Translation } from '@income/index';
import * as leftPad from 'left-pad';
import { LocalesPipeline } from '@core/pipeline/localePipeline';
import { ItemLocalTranslations, Item } from '@outcome/item';

export class ItemLocalesPipeline extends LocalesPipeline<Item, ItemLocalTranslations> {
    constructor(
        translations: Translation[],
        entities: Item[],
        locales: string[]) {
        super(translations, entities, locales, item => item.id);
    }

    async mapData(translation: ItemLocalTranslations, item: Item, localeName: string) {
        const leftPaddedDex = leftPad(item.id, 4, '0');
        try {
            translation.name = this.generateLocaleByKey(`item_${item.id.toLowerCase()}_name`, localeName)
            translation.description = this.generateLocaleByKey(`item_${item.id.toLowerCase()}_desc`, localeName)
        }
        catch (err) {
        }
        return translation;
    }
}
