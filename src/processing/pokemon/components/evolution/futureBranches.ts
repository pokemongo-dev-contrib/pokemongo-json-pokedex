import { Component, ComponentType, IComponent } from '@core/pipeline/component';
import { EvolutionCostToEvolve, FutureEvolutionBranch, Pokemon, PokemonEvolution } from '@outcome/pokemon';

import { GenericPropertyMapper } from '../genericPropertyMapper';
import { ItemTemplate } from '@income';
import { PokemonEvolutionParser } from './pokemonEvolution';
import { Util } from '@util';
import { Identifyable } from '@core';

@Component({
    pipeline: 'pokemon',
    type: ComponentType.ADVANCED_MAP,
    dependencies: [
        new GenericPropertyMapper(),
        new PokemonEvolutionParser(),
    ]
})

/**
 * Parses the future evolutions
 */
export class FutureBranches implements IComponent {
    rawPokemons: ItemTemplate[];
    /**
     * Returns the future evolutions from the given GAME_MASTER data.
     * @param pokemonId The id of the pokemon
     */
    private GetFutureRawEvolutions(pokemon: ItemTemplate): ItemTemplate[] {
        return (pokemon.pokemonSettings.evolutionBranch || []).map(branch => this.GetRawPokemonById(branch.evolution));
    }

    /**
     * Returns the cost for the evolution of the Pokemon
     * @param pokemonId The id of the pokemon you want to have the evolution cost
     * @param rawPokemon The GAME_MASTER provided raw pokemon of the lower evolution branch
     */
    private GetEvolutionCost(futurePokemonId: string, rawPokemon: ItemTemplate): EvolutionCostToEvolve {
        const evolutionBranch = (rawPokemon.pokemonSettings.evolutionBranch || []).find(evolution => evolution.evolution === futurePokemonId);

        // If no evolution is found, just return nothing
        if (!evolutionBranch) {
            return;
        }

        // Make evolutionItemRequirement to Identifyable
        let evolutionItem: Identifyable;
        if (evolutionBranch.evolutionItemRequirement) {
            evolutionItem = {
                id: evolutionBranch.evolutionItemRequirement,
                name: Util.SnakeCase2HumanReadable(evolutionBranch.evolutionItemRequirement.replace('ITEM_', ''))
            };
        }

        // Return evolutionCost Object
        return {
            candyCost: evolutionBranch.candyCost,
            kmBuddyDistance: evolutionBranch.kmBuddyDistanceRequirement,
            evolutionItem: evolutionItem ? evolutionItem : undefined,
        }
    }

    /**
     * Get the raw GAME_MASTER pokemon by id
     * @param pokemonId The pokemon id
     */
    private GetRawPokemonById(pokemonId): ItemTemplate {
        return this.rawPokemons.find(pokemon => pokemon.pokemonSettings.pokemonId === pokemonId);
    }

    /**
     * Recursively gets all future branches from the given pokemon
     * @param pokemonId The id of the pokemon
     */
    private GetFutureBranches(rawPokemon: ItemTemplate): FutureEvolutionBranch[] {
        const futurePokemons = this.GetFutureRawEvolutions(rawPokemon);
        if (!futurePokemons.length) {
            return undefined;
        }
        return futurePokemons.map(futurePokemon => ({
            ...Util.SnakeCase2Identifyable(futurePokemon.pokemonSettings.pokemonId),
            futureBranches: this.GetFutureBranches(futurePokemon),
            costToEvolve: this.GetEvolutionCost(futurePokemon.pokemonSettings.pokemonId, rawPokemon),
        } as FutureEvolutionBranch))
    }

    Process(pokemons: Pokemon[], rawPokemons: ItemTemplate[]): Pokemon[] {
        this.rawPokemons = rawPokemons;
        return pokemons.map(pokemon => {
            const rawPokemon = this.GetRawPokemonById(pokemon.id);
            pokemon.evolution.futureBranches = this.GetFutureBranches(rawPokemon);
            return pokemon;
        });
    }
}