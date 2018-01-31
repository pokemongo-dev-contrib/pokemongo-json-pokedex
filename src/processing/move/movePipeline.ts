import { ItemTemplate, RootObject } from '@core';

import { Move } from '@outcome/move';
import { Pipeline } from '@core/pipeline';

/**
 * Represents the Pipeline which converts Game Master Move related
 * input data to Move models
 */
export class MovePipeline extends Pipeline {
  constructor(input: RootObject) {
    super(input, 'move');
  }

  /**
   * Checks if the given ItemTemplate is indeed a move
   */
  isItemTemplate(item: ItemTemplate): boolean {
    return new RegExp('^(V[0-9]+_MOVE_?.*)', 'g').test(item.templateId);
  }
}
