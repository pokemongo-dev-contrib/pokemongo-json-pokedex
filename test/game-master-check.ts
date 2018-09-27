import { expect } from 'chai';

describe('GAME_MASTER.json check', () => {
    let gameMaster;

    beforeEach(() => {
        gameMaster = require('../src/data/GAME_MASTER.json');
    });

    const findById = id => gameMaster.itemTemplates.find(item => item.templateId === id);

    // it('_NORMAL pokemons should not differ from its default form', () => {
    //     // Check issue #8 https://github.com/pokemongo-dev-contrib/pokemongo-json-pokedex/issues/8
    //     const pokemons = gameMaster.itemTemplates.filter(item =>
    //         item.templateId.endsWith('_NORMAL') &&
    //         item.templateId.startsWith('V'));
    //     pokemons.forEach(normalPokemon => {
    //         const newTemplateId = normalPokemon.templateId.replace('_NORMAL', '');
    //         const defaultPokemon = findById(newTemplateId);
    //         delete defaultPokemon.templateId;
    //         delete defaultPokemon.pokemonSettings.form;
    //         delete defaultPokemon.cinematicMoves;
    //         delete normalPokemon.templateId;
    //         delete normalPokemon.pokemonSettings.form;
    //         delete normalPokemon.cinematicMoves;
    //         expect(defaultPokemon, newTemplateId).to.deep.equal(normalPokemon);
    //     });
    // });
});
