import { Component, ComponentType, IComponent } from '@core/pipeline/component';
import { EvolutionCostToEvolve, PastEvolutionBranch, Pokemon, PokemonEvolution } from '@outcome/pokemon/index';

import { GenericPropertyMapper } from '../genericPropertyMapper';
import { ItemTemplate } from '@income/index';
import { PokemonEvolutionParser } from './pokemonEvolution';
import { Util } from '@util/index';
import { Identifyable } from '@core/index';
import { Id } from '../id';
import { TemplateIdToId } from '../shared/templateIdToId';

@Component({
    pipeline: 'pokemon',
    type: ComponentType.ADVANCED_MAP,
    dependencies: [
        new Id(),
        new GenericPropertyMapper(),
        new PokemonEvolutionParser(),
    ]
})

/**
 * Parses the past evolutions
 */
export class PastBranches implements IComponent {
    rawPokemons: ItemTemplate[];
    /**
     * Get the raw GAME_MASTER pokemon by id
     * @param pokemonId The pokemon id
     */
    private GetRawPokemonById(pokemonId): ItemTemplate {
        return this.rawPokemons.find(pokemon => TemplateIdToId(pokemon) === pokemonId);
    }

    /**
     * Returns the previous evolution from the given GAME_MASTER data.
     * @param pokemonId The id of the pokemon
     */
    private GetPreviousRawEvolution(pokemonId: string): ItemTemplate {
        return this.rawPokemons.find(item =>
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
        if (!rawPokemon) return undefined;
        const evolutionBranch = rawPokemon.pokemonSettings.evolutionBranch.find(evolution => evolution.evolution === pokemonId);

        // Make evolutionItemRequirement to Identifyable
        let evolutionItem: Identifyable;
        if (evolutionBranch.evolutionItemRequirement) {
            evolutionItem = {
                id: evolutionBranch.evolutionItemRequirement,
                name: Util.SnakeCase2HumanReadable(evolutionBranch.evolutionItemRequirement.replace('ITEM_', ''))
            };
        }
        return {
            candyCost: evolutionBranch.candyCost,
            kmBuddyDistance: evolutionBranch.kmBuddyDistanceRequirement,
            evolutionItem: evolutionItem,
        }
    }

    /**
     * Recursively gets all past branches from the given pokemon
     * @param pokemonId The id of the pokemon
     * @param rawPokemons All raw GAME_MASTER pokemons
     */
    private GetPastBranch(pokemonId): PastEvolutionBranch {
        const pastPokemon = this.GetPreviousRawEvolution(pokemonId);
        if (!pastPokemon) {
            return undefined;
        }

        const rawPastPokemon = this.GetPreviousRawEvolution(TemplateIdToId(pastPokemon));

        const costToEvolve = this.GetEvolutionCost(TemplateIdToId(pastPokemon), rawPastPokemon);
        const pastBranch = this.GetPastBranch(TemplateIdToId(pastPokemon));
        return {
            ...Util.SnakeCase2Identifyable(TemplateIdToId(pastPokemon)),
            pastBranch,
            costToEvolve
        };
    }
    Process(pokemons: Pokemon[], rawPokemons: ItemTemplate[]): Pokemon[] {
        this.rawPokemons = rawPokemons;
        return pokemons.map(pokemon => {
            pokemon.evolution.pastBranch = this.GetPastBranch(pokemon.id);
            const previousEvolution = this.GetPreviousRawEvolution(pokemon.id);
            if (previousEvolution) {
                pokemon.evolution.costToEvolve = this.GetEvolutionCost(pokemon.id, previousEvolution)
            }
            return pokemon;
        });
    }
}
