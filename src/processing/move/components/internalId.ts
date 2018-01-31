import { Component, IComponent } from '@core/pipeline';

import { ItemTemplate } from '@income';
import { Move } from '@outcome/move';
import { Util } from '@util';

@Component({
    pipeline: 'move'
})
export class InternalId implements IComponent {
    /**
     * Maps generic properties which do not need to be processed.
     */
    Process(move: Move, rawMove: ItemTemplate): Move {
        move.internalId = parseInt(rawMove.templateId.split('_')[0].slice(1), 10);
        return move;
    }
}