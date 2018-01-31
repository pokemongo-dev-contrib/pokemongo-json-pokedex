import { Identifyable } from '@core/identifyable';
import { PokemonGender } from './pokemonGender';

/**
 * Data about an encouter in the wild with the Pokemon
 */
export interface PokemonEncounter {
  /**
   * The base of the chance the Pokemon flees.
   * @example
   * 0.07
   */
  baseFleeRate: number;
  /**
   * The base of the chance the Pokemon can be captured
   * @example
   * 0.1
   */
  baseCaptureRate: number;
  /**
   * The radius of the Pokemon it can have a collision with an item during
   * "Capturing"-phase
   * @example
   * 0.2575
   */
  collisionRadius: number;
  /**
   * The type of movement the Pokemon does during "Capturing"-phase
   * @example
   * {
   *  "name": "Movement Jump",
   *  "id": "MOVEMENT_JUMP"
   * }
   */
  movementType?: Identifyable;
  /**
   * The time the Pokemon jumps
   * @example
   * 1.15
   */
  jumpTime: number;
  /**
   * The timer until the Pokemon attacks
   * @example
   * 8
   */
  attackTimer: number;
  /**
   * The chance the Pokemon attacks
   * @example
   * 0.1
   */
  attackProbability: number;
  /**
   * The chance the Pokemon to dodge
   * @example
   * 0.15
   */
  dodgeProbability: number;
  /**
   * The distance the Pokemon moves when dodgin
   * @example
   * 1
   */
  dodgeDistance: number;
  /**
   * The distance of the camera during "Capturing"-phase
   * @example
   * 3.984375
   */
  cameraDistance: number;
  /**
   * The minimum action frequency
   * @example
   * 0.2
   */
  minPokemonActionFrequency: number;
  /**
   * The minimum action frequency
   * @example
   * 1.6
   */
  maxPokemonActionFrequency: number;
  /**
   * Represents the chance of the Pokemons chance being male
   * or female during when encoutering one in the wild.
   */
  gender?: PokemonGender;
}
