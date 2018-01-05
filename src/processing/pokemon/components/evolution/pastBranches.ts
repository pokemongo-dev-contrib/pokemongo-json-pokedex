import { Component, ComponentType, IComponent } from '@core/pipeline/component';
import { EvolutionCostToEvolve, PastEvolutionBranch, Pokemon, PokemonEvolution } from '@outcome/pokemon';

import { GenericPropertyMapper } from '../genericPropertyMapper';
import { ItemTemplate } from '@income';
import { PokemonEvolutionParser } from './pokemonEvolution';
import { Util } from '@util';

@Component({
    pipeline: 'pokemon',
    type: ComponentType.ADVANCED_MAP,
    dependencies: [
        new GenericPropertyMapper(),
        new PokemonEvolutionParser(),
    ]
})

/**
 * Parses the past evolutions
 */
export class PastBranches implements IComponent {
    /**
     * Returns the previous evolution from the given GAME_MASTER data.
     * @param pokemonId The id of the pokemon
     * @param rawPokemons  All raw GAME_MASTER pokemons
     */
    private GetPreviousRawEvolution(pokemonId: string, rawPokemons: ItemTemplate[]): ItemTemplate {
        return rawPokemons.find(item =>
            (item.pokemonSettings.evolutionBranch || [])
                .some(evolution => evolution.evolution === pokemonId)
        )
    }

    /**
     * Returns the cost for the evolution of the Pokemon
     * @param pokemonId The id of the pokemon you want to have the evolution cost
     * @param rawPokemon The GAME_MASTER provided raw pokemon of the lower evolution branch
     */
    private GetEvolutionCost(pokemonId: string, rawPokemon: ItemTemplate): EvolutionCostToEvolve {
        const evolutionBranch = rawPokemon.pokemonSettings.evolutionBranch.find(evolution => evolution.evolution === pokemonId);
        return {
            candyCost: rawPokemon.pokemonSettings.candyToEvolve,
            kmBuddyDistance: rawPokemon.pokemonSettings.kmBuddyDistance,
            evolutionItem: evolutionBranch.evolutionItemRequirement ? Util.SnakeCase2Identifyable(evolutionBranch.evolutionItemRequirement) : undefined,
        }
    }

    /**
     * Recursively gets all past branches from the given pokemon
     * @param pokemonId The id of the pokemon
     * @param rawPokemons All raw GAME_MASTER pokemons
     */
    private GetPastBranch(pokemonId, rawPokemons): PastEvolutionBranch {
        const pastPokemon = this.GetPreviousRawEvolution(pokemonId, rawPokemons);
        if (!pastPokemon) {
            return undefined;
        }
        return {
            ...Util.SnakeCase2Identifyable(pastPokemon.pokemonSettings.pokemonId),
            pastBranch: this.GetPastBranch(pastPokemon.pokemonSettings.pokemonId, rawPokemons),
            costToEvolve: this.GetEvolutionCost(pokemonId, pastPokemon),
        };
    }
    Process(pokemons: Pokemon[], rawPokemons: ItemTemplate[]): Pokemon[] {
        return pokemons.map(pokemon => {
            pokemon.evolution.pastBranch = this.GetPastBranch(pokemon.id, rawPokemons);
            return pokemon;
        });
    }
}