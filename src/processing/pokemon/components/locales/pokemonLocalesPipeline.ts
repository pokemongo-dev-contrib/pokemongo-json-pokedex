import { IPipeline } from '@core';
import { Pokemon, PokemonLocal } from '@outcome/pokemon';
import { PokemonTranslation } from '@income/index';
import { Locale } from '@outcome/locales/locale.interface';
import * as leftPad from 'left-pad';

export class PokemonLocalesPipeline implements IPipeline {
    constructor(
        private translations: PokemonTranslation[],
        private pokemons: Pokemon[],
        private locales: string[]) {

    }

    getTranslationByKey(key: string) {
        return this.translations.find(translation => translation.Key === key);
    }

    mapLocales(translation: PokemonTranslation, localeName: string) {
        switch (localeName) {
            case 'de-DE':
                return translation.German;
            case 'en-US':
                return translation.English;
            case 'zh-TW':
                return translation.ChineseTraditional;
            case 'es-ES':
                return translation.Spanish;
            case 'it-IT':
                return translation.Italian;
            case 'pt-BR':
                return translation.BrazilianPortuguese;
            case 'ko-KR':
                return translation.Korean;
            case 'ja-JP':
                return translation.Japanese;
            case 'fr-FR':
                return translation.French;
            default:
                throw new Error('Translation not found!');
        }
    }

    async Run(): Promise<PokemonLocal[]> {
        return this.locales.map((localeName): PokemonLocal => {
            let data = {};
            this.pokemons.forEach(pokemon => {
                const translationName = this.getTranslationByKey('pokemon_name_' + leftPad(pokemon.dex, 4, '0'));
                const translationDescription = this.getTranslationByKey('pokemon_desc_' + leftPad(pokemon.dex, 4, '0'));
                const translationCategory = this.getTranslationByKey('pokemon_category_' + leftPad(pokemon.dex, 4, '0'));
                data[pokemon.id] = {};
                data[pokemon.id].name = this.mapLocales(translationName, localeName);
                data[pokemon.id].description = this.mapLocales(translationDescription, localeName);
                data[pokemon.id].category = this.mapLocales(translationCategory, localeName);
            });
            return { name: localeName, data };
        });
    }

}
