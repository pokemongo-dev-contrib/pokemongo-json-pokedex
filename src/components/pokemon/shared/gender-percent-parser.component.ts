import { ItemTemplate, RootObject } from '@core';

import { Component } from '@core/component';
import { PokemonGender } from '../pokemon.model';

/**
 * Parses the gender-spawn-percentage of the given Pokémon ID
 */
export class GenderPercentParser implements Component {
    constructor(private gameMaster: RootObject) { }
    private readonly spawnRegex: string = '^(SPAWN_V[0-9]+_POKEMON_?.*)';
    private isItemTemplateSpawn(item: ItemTemplate): boolean {
        return new RegExp(this.spawnRegex, 'g').test(item.templateId);
    }

    /**
     * Parses the gender-spawn-percentage of the given Pokémon ID)
     * @param {String} id The id of the Pokémon (Example: BULBASAUR)
     * @returns {PokemonGender} Object with the Pokémon Gender Percent values
     */
    Process(pokemonId: string): PokemonGender {
        const itemTemplate = this.gameMaster
            .itemTemplates
            .filter(itemTemplate => this.isItemTemplateSpawn(itemTemplate))
            .find(itemTemplate =>
                itemTemplate.genderSettings.pokemon === pokemonId);
        let malePercent = itemTemplate.genderSettings.gender.malePercent;
        let femalePercent = itemTemplate.genderSettings.gender.femalePercent;

        // For NIDORAN_MALE
        if (malePercent === 1) {
            femalePercent = 0;
        }

        // For NIDODRAN_FEMALE
        if (femalePercent === 1) {
            malePercent = 0;
        }

        // No gender
        if (!malePercent && !femalePercent) {
            return null;
        }

        return {
            malePercent: malePercent,
            femalePercent: femalePercent
        };
    }
}
