import { ItemTemplate, RootObject } from '@income/index';

import { Pipeline } from '@core/pipeline/index';

/**
 * Represents the Pipeline which converts Game Master Item related
 * input data to Item models
 */
export class ItemPipeline extends Pipeline {
  constructor(input: RootObject) {
    super(input, 'item');
  }

  /**
   * Checks if the given ItemTemplate is indeed an item
   */
  isItemTemplate(item: ItemTemplate): boolean {
    return new RegExp('^(ITEM_?.*)', 'g').test(item.templateId);
  }
}
