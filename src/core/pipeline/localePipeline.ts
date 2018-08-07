import { IPipeline } from '@core';
import { Translation } from '@income';
import { Locale } from '@outcome/locales/locale.interface';
import { forEachSeries, mapSeries } from 'p-iteration';

export type GetKey<E> = (entity: E) => string;

export abstract class LocalesPipeline<E, T> implements IPipeline {
    constructor(
        protected translations: Translation[],
        protected entities: E[],
        protected locales: string[],
        protected getKey: GetKey<E>) {

    }

    protected getTranslationByKey(key: string) {
        return this.translations.find(translation => translation.Key === key);
    }

    protected mapLocales(translation: Translation, localeName: string) {
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

    protected generateLocaleByKey(key: string, localeName: string) {
        const translation = this.getTranslationByKey(key);
        let locales;
        try {
            locales = this.mapLocales(translation, localeName);
        }
        catch (err) {
            throw new Error(err.message + ' Key: ' + key);
        }
        return locales;
    }

    abstract async mapData(translation: T, entity: E, localeName: string);

    private async getLocaleByName(localeName: string): Promise<Locale<T>> {
        let data = {};
        await forEachSeries(this.entities, async entity => {
            const key = this.getKey(entity);
            data[key] = await this.mapData(data[key] || {}, entity, localeName)
        });
        return { name: localeName, data };
    }

    async Run(): Promise<Locale<T>[]> {
        return await mapSeries(this.locales, name => this.getLocaleByName(name));
    }

}
