import { Pipeline } from '@core/pipeline';
import { RootObject, ItemTemplate } from '@income';
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

  private isPokemon(templateId: string) {
    return new RegExp('^(V[0-9]+_POKEMON_?.*)', 'g').test(templateId);
  }

  private isNormalPokemon(templateId: string) {
    return new RegExp('^(V[0-9]+_POKEMON_?.*_NORMAL)', 'g').test(templateId)
  }

  /**
   * Checks if the given ItemTemplate is indeed a Pokemon
   */
  isItemTemplate(item: ItemTemplate): boolean {
    const id = item.templateId;
    return this.isPokemon(id) && !this.isNormalPokemon(id);
  }
}
