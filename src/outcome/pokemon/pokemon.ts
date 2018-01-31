import { Identifyable } from '@core/identifyable';
import { PokemonCamera } from './pokemonCamera';
import { PokemonEncounter } from './pokemonEncounter';
import { PokemonEvolution } from './evolution';
import { PokemonStats } from './pokemonStats';

/**
 * Represents one Pokemon of PokemonGO
 */
interface Pokemon {
    /**
     * The formatted english name of the Pokemon.
     * @example
     * Bulbasaur
     */
    name: string;
    /**
     * The identifcation of the Pokemon.
     * @example
     * BULBASAUR
     */
    id: string;
    /**
     * The pokedex number of the Pokemon.
     * @example
     * 1
     */
    dex: number;
    /**
     * A floating number of the scale of the ingame model.
     * @example
     * 1.09
     */
    modelScale: number;
    /**
     * Array of types it has of the Pokemon.
     * @example
     * [
     *      {
     *          "id": "POKEMON_TYPE_GRASS",
     *          "name": "Grass"
     *      },
     *      {
     *          "id": "POKEMON_TYPE_POISON",
     *          "name": "Poison"
     *      }
     *  ]
     */
    types: Identifyable[];
    /**
     * Data about an encouter with the Pokemon
     */
    encounter: PokemonEncounter;
    /**
     * Data about the ingame camera settings of the Pokemon
     */
    camera: PokemonCamera;
    /**
     * Data about the statistics of the Pokemon
     */
    stats: PokemonStats;
    /**
     * Array of quickMoves the Pokemon can learn.
     * @example
     * [
     *      {
     *          "name": "Razor Leaf Fast",
     *          "id": "RAZOR_LEAF_FAST"
     *      },
     *      {
     *          "name": "Vine Whip Fast",
     *          "id": "VINE_WHIP_FAST"
     *      }
     *  ]
     */
    quickMoves: Identifyable[];
    /**
     * Array of cinematic moves the Pokemon can learn.
     * @example
     * [
     *     {
     *         "name": "Sludge Bomb",
     *         "id": "SLUDGE_BOMB"
     *     },
     *     {
     *         "name": "Seed Bomb",
     *         "id": "SEED_BOMB"
     *     },
     *     {
     *         "name": "Power Whip",
     *         "id": "POWER_WHIP"
     *     }
     * ]
     */
    cinematicMoves: Identifyable[];
    /**
     * Unknown
     */
    animationTime: number[];
    /**
     * The rarity of the Pokemon. Can be null
     * @example
     * {
     *      "id": "POKEMON_RARITY_LEGENDARY",
     *      "name": "Legendary"
     *  }
     */
    rarity: Identifyable;
    /**
     * A floating number which represent the height of the Pokemon.
     * @example
     * 0.7
     */
    height: number;
    /**
     * A floating number which represents the weight of the Pokemon.
     * @example
     * 13
     */
    weight: number;
    /**
     * The family of which the (evolved) Pokemon  is from.
     * @example
     * {
     *      "id": "FAMILY_BULBASAUR",
     *      "name": "Bulbasaur"
     * }
     */
    family: Identifyable;
    /**
     * The amount of Kilometer a Player must walk with the Pokemon, to get
     * a candy of the Pokemon
     * @example
     * 3
     */
    kmBuddyDistance: number;
    /**
     * The max CP the Pokemon can reach
     * @example
     * 2568
     */
    maxCP: number;
    /**
     * The size of the Pokemon, when it is chosen as
     * a buddy.
     * @example
     * {
     *      "id": "BUDDY_BIG",
     *      "name": "Big"
     * }
     */
    buddySize: Identifyable;
    /**
     * The height of the model ingame
     * @example
     * 1.91
     */
    modelHeight: number;
    /**
     * Evolution related data
     */
    evolution: PokemonEvolution;
}

export { Pokemon };
