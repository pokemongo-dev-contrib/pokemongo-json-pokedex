import { Component, IComponent } from '@core/pipeline';

import { ItemTemplate } from '@income';
import { Move } from '@outcome/move';
import { Util } from '@util';

@Component({
    pipeline: 'move'
})
export class Name implements IComponent {
    /**
     * Maps generic properties which do not need to be processed.
     */
    Process(move: Move, rawMove: ItemTemplate): Move {
        move.name = Util.SnakeCase2HumanReadable(rawMove.moveSettings.movementId);
        return move;
    }
}