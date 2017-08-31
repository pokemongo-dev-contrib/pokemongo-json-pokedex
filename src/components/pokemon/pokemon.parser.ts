import { Identifyable, ItemTemplate, Parser, RootObject } from '@core';
import { Pokemon, PokemonMapper } from './';

import { EvolutionTree } from './shared/evolution-tree'

class PokemonParser implements Parser {
    private readonly pokemonRegex: string = '^(V[0-9]+_POKEMON_?.*)';
    private isItemTemplatePokemon(item: ItemTemplate): boolean {
        return new RegExp(this.pokemonRegex, 'g').test(item.templateId);
    }

    public Parse(gameMaster: RootObject): Pokemon[] {
        let returnValue = gameMaster
            .itemTemplates
            .filter(p => { return this.isItemTemplatePokemon(p); })
            .map(p => PokemonMapper.Map(p, gameMaster));
        returnValue = this.generateBackrefs(returnValue);
        returnValue = this.generateFrontRefs(returnValue);
        return returnValue;
    }

    public generateBackrefs(parsedPokemon: Pokemon[]): Pokemon[] {
        // This generates one pastEvolution for all pokemon
        let backrefs = parsedPokemon.reduce((backrefsTemporary, pokemon) => {
            pokemon.nextEvolutionBranches.forEach(branch => backrefsTemporary.set(branch.id, [pokemon]));
            return backrefsTemporary;
        }, new Map<string, Pokemon[]>());

        // Use graph traversal to fill in more pastEvolutions
        // TODO: Use a for loop to iterate over more than 2 previous evolutions.
        backrefs.forEach((pastPokemonList, backrefIndex, backrefsTemp) => pastPokemonList.forEach(currentPastEvolution => {
            if (!backrefsTemp.has(currentPastEvolution.id)) { return; }
            const newPastEvolutions = backrefsTemp.get(currentPastEvolution.id);
            backrefs.set(backrefIndex, newPastEvolutions.concat(pastPokemonList));
        }));

        // Finally, update the parsedPokemon list.
        return parsedPokemon.map(pokemon => {
            const pastEvolutions = backrefs.get(pokemon.id);
            if (pastEvolutions === undefined || pastEvolutions.length === 0) {
                return pokemon;
            }
            pokemon.pastEvolutions = pokemon.pastEvolutions || [];
            pokemon.pastEvolutions = pastEvolutions
                .map(currentPriorEvolution => { return { name: currentPriorEvolution.name, id: currentPriorEvolution.id }; })
                .concat(pokemon.pastEvolutions);
            return pokemon;
        });
    }

    public generateFrontRefs(pastPokemon: Pokemon[]): Pokemon[] {
        // First, we need a mapping from ID to Pokemon.
        let pokemonIdMap = pastPokemon.reduce((temporaryIdMap, currentPokemon) => {
            temporaryIdMap.set(currentPokemon.id, currentPokemon);
            return temporaryIdMap;
        }, new Map<string, Pokemon>());

        // And now, graph traversal...
        for (let treeLevel = 0; treeLevel < 2; treeLevel++) {
            pokemonIdMap.forEach((pokemonObject, pokemonId) => {
                if (pokemonObject.futureEvolutions === undefined) {
                    pokemonObject.futureEvolutions = new EvolutionTree(pokemonObject.name, pokemonObject.id);
                }
                pokemonObject.futureEvolutions = pokemonObject.futureEvolutions.mapInLevel(treeLevel, currentSubtree => {
                    const currEntry = pokemonIdMap.get(currentSubtree.id);
                    return new EvolutionTree(
                        currentSubtree.name,
                        currentSubtree.id,
                        currEntry.nextEvolutionBranches.map(evolutionBranch => new EvolutionTree(evolutionBranch.name, evolutionBranch.id))
                    );
                })
            });
        }
        return Array.from(pokemonIdMap.values());
    }
}

export { PokemonParser };