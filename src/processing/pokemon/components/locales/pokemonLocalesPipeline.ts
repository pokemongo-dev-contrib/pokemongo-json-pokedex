import { IPipeline } from '@core';
import { Pokemon, PokemonLocal, PokemonLocalTranslations } from '@outcome/pokemon';
import { Translation } from '@income/index';
import { Locale } from '@outcome/locales/locale.interface';
import * as leftPad from 'left-pad';
import { LocalesPipeline } from '@core/pipeline/localePipeline';

export class PokemonLocalesPipeline extends LocalesPipeline<Pokemon, PokemonLocalTranslations> {
    constructor(
        translations: Translation[],
        entities: Pokemon[],
        locales: string[]) {
        super(translations, entities, locales, pokemon => pokemon.id);
    }

    async mapData(translation: PokemonLocalTranslations, pokemon: Pokemon, localeName: string) {
        const leftPaddedDex = leftPad(pokemon.dex, 4, '0');
        translation.name = this.generateLocaleByKey(`pokemon_name_${leftPaddedDex}`, localeName)
        translation.description = this.generateLocaleByKey(`pokemon_desc_${leftPaddedDex}`, localeName)
        translation.category = this.generateLocaleByKey(`pokemon_category_${leftPaddedDex}`, localeName)
        return translation;
    }
}
