/**
 * Represents the chance of the Pokemons chance being male
 * or female during when encoutering one in the wild.
 */
export interface PokemonGender {
  /*
   * The chance of the Pokémon being male. 100% = 1, 0% = 0
   * @example
   * 0.875
   */
  malePercent: number;
  /*
   * The chance of the Pokémon being female. 100% = 1, 0% = 0
   * @example
   * 0.125
   */
  femalePercent: number;
}
