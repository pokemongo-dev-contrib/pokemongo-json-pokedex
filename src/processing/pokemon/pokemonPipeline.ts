import { Pipeline } from '@core/pipeline';
import { RootObject, ItemTemplate } from '@core';
import { Pokemon } from '@outcome/pokemon';

/**
 * Represents the Pipeline which converts Game Master Pokemon related
 * input data to Pokemon models
 */
export class PokemonPipeline extends Pipeline {
  private readonly pokemonRegex: string = '^(V[0-9]+_POKEMON_?.*)';

  constructor(input: RootObject) {
    super(input, 'pokemon');
  }

  /**
   * Checks if the given ItemTemplate is indeed a Pokemon
   */
  isItemTemplate(item: ItemTemplate): boolean {
    return new RegExp('^(V[0-9]+_POKEMON_?.*)', 'g').test(item.templateId);
  }
}