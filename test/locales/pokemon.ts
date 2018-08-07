import { expect } from 'chai';
import { ItemInventoryUpgrade } from '../outcome/item/item';

describe('Locales Output', () => {
    let pokemons;
    let translations;
    beforeEach(() => {
        pokemons = require('../../output/pokemon.json');
        const locales = ['de-DE', 'en-US', 'zh-TW', 'fr-FR', 'es-ES', 'ja-JP', 'it-IT', 'ko-KR', 'pt-BR'];
        translations = locales.map(local => require('../../output/locales/' + local + '/pokemon.json'));
    });


    it('should have a key for each pokemon', () => {
        translations.forEach(translation => expect(Object.keys(translation).length).to.equal(pokemons.length))
    });

    it('should display bisasam in german translation', () => {
        expect(translations[0].BULBASAUR.name).to.equal('Bisasam');
    });
    it('should have the correct description for bulbasaur german translation', () => {
        expect(translations[0].BULBASAUR.description).to.equal('Bisasam macht gern einmal ein Nickerchen im Sonnenschein. Auf seinem Rücken trägt es einen Samen. Indem es Sonnenstrahlen aufsaugt, wird der Samen zunehmend größer.');
    });
    it('should have the correct category for bulbasaur', () => {
        expect(translations[0].BULBASAUR.category).to.equal('Samen-Pokémon');
    });
});
