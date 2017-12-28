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
        returnValue = this.generateBackrefCosts(returnValue);
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

        return parsedPokemon.map(pokemon => {
            const pastEvolutions = backrefs.get(pokemon.id);
            if (pastEvolutions === undefined || pastEvolutions.length === 0) {
                return pokemon;
            }
            pokemon.pastEvolutions = pokemon.pastEvolutions || [];
            pokemon.pastEvolutions = pastEvolutions
                .map(currentPriorEvolution => {
                    return { name: currentPriorEvolution.name, id: currentPriorEvolution.id };
                })
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
        pokemonIdMap.forEach((pokemonObject, pokemonId) => {
            if (pokemonObject.futureEvolutions === undefined) {
                if (pokemonObject.pastEvolutions && pokemonObject.pastEvolutions.length) {
                    const preEvolution = pokemonIdMap.get(pokemonObject.pastEvolutions[pokemonObject.pastEvolutions.length - 1].id);
                    const evolutionCost = preEvolution.nextEvolutionBranches.filter(evolution => evolution.id === pokemonObject.id)[0];
                    pokemonObject.futureEvolutions = new EvolutionTree(pokemonObject.name, pokemonObject.id, evolutionCost.candyCost, evolutionCost.evolutionItem, evolutionCost.kmBuddyDistanceRequirement);
                } else {
                    pokemonObject.futureEvolutions = new EvolutionTree(pokemonObject.name, pokemonObject.id);
                }
            }
            for (let treeLevel = 0; treeLevel < 2; treeLevel++) {
                pokemonObject.futureEvolutions = pokemonObject.futureEvolutions.mapInLevel(treeLevel, currentSubtree => {
                    const currEntry = pokemonIdMap.get(currentSubtree.id);
                    let evolutionCost: Identifyable = { name: currentSubtree.name, id: currentSubtree.id };
                    if (currEntry.pastEvolutions && currEntry.pastEvolutions.length) {
                        const preEvolution = pokemonIdMap.get(currEntry.pastEvolutions[currEntry.pastEvolutions.length - 1].id);
                        evolutionCost = preEvolution.nextEvolutionBranches.filter(evolution => evolution.id === currEntry.id)[0];
                        pokemonObject.futureEvolutions = new EvolutionTree(pokemonObject.name, pokemonObject.id, evolutionCost.candyCost, evolutionCost.evolutionItem, evolutionCost.kmBuddyDistanceRequirement);
                    }

                    return new EvolutionTree(
                        currentSubtree.name,
                        currentSubtree.id,
                        evolutionCost.candyCost,
                        evolutionCost.evolutionItem,
                        evolutionCost.kmBuddyDistanceRequirement,
                        currEntry.nextEvolutionBranches.map(evolutionBranch => new EvolutionTree(evolutionBranch.name, evolutionBranch.id, evolutionBranch.candyCost, evolutionBranch.evolutionItem, evolutionBranch.kmBuddyDistanceRequirement))
                    );
                })
            }
        });
        return Array.from(pokemonIdMap.values());
    }

    public generateBackrefCosts(parsedPokemon: Pokemon[]): Pokemon[] {
        const dictionary = parsedPokemon.reduce((dictionaryTemp, pokemon) => {
            dictionaryTemp.set(pokemon.id, pokemon)
            return dictionaryTemp;
        }, new Map<string, Pokemon>());

        return parsedPokemon.map(pokemon => {
            if (pokemon.pastEvolutions) {
                pokemon.pastEvolutions = pokemon.pastEvolutions.map(pastPokemon => {
                    const pastPokemonTemp = dictionary.get(pastPokemon.id)
                    pastPokemon.candyCost = pastPokemonTemp.futureEvolutions.candyCost;
                    pastPokemon.evolutionItem = pastPokemonTemp.futureEvolutions.evolutionItem;
                    pastPokemon.kmBuddyDistanceRequirement = pastPokemonTemp.futureEvolutions.kmBuddyDistanceRequirement;
                    return pastPokemon;
                })
            }

            return pokemon;
        });
    }
}

export { PokemonParser };