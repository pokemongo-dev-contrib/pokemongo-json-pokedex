import { ItemTemplate, RootObject } from '@core';

import { Pipeline } from '@core/pipeline';
import { Pokemon } from '@outcome/pokemon';

/**
 * Represents the Pipeline which converts Game Master Pokemon-Type related
 * input data to Type models
 */
export class TypePipeline extends Pipeline {
  constructor(input: RootObject) {
    super(input, 'type');
  }

  /**
   * Checks if the given ItemTemplate is indeed a Pokemon Type
   */
  isItemTemplate(item: ItemTemplate): boolean {
    return new RegExp('^POKEMON_TYPE_.*$', 'g').test(item.templateId);
  }
}