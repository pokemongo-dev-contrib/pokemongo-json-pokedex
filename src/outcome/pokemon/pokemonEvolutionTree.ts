import { Identifyable } from '@core/identifyable';

/**
 * An EvolutionTree represents all possible future evolutions of a pokemon.
 * Mutually exclusive choices are given on the same level, while sequential
 * choices are presented in increasing depth.
 *
 * For example, Eevee's EvolutionTree would take 6 objects in depth 2, but
 * Charmander's EvolutionTree would take 3 objects in depth 3.
 */
export interface PokemonEvolutionTree extends Identifyable {
    /**
     * The formatted english name of the Pokemon.
     * @example
     * Butterfee
     */
     name: string;
     /**
     * The identifcation of the Pokemon.
     * @example
     * BULBASAUR
     */
     id: string;
    /**
     * The amount of candy it costs to evolve into the Pokemon.
     */
     candyCost: number;
     /**
      * The item it requires in order to evolve into the Pokemon.
      * @example
      * {
      *   "id": "ITEM_SUN_STONE",
      *   "name": "Sun Stone"
      *  }
      */
     evolutionItem: Identifyable;
     /**
      * The amount the player needs to walk with the Pokemon in order to evolve it
      * @example
      * 20
      */
     kmBuddyDistanceRequirement: number;
     /**
      * Any future Pokemon evolutions this Pokemon has.
      */
     futureEvolutions: PokemonEvolutionTree[];
}