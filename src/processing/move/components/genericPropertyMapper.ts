import { Component, IComponent } from '@core/pipeline';

import { ItemTemplate } from '@income';
import { Move } from '@outcome/move';
import { Util } from '@util';

@Component({
  pipeline: 'move'
})
export class GenericPropertyMapper implements IComponent {
  /**
   * Maps generic properties which do not need to be processed.
   */
  Process(move: Move, rawMove: ItemTemplate): Move {
    let moveStgs = rawMove.moveSettings;
        move.accuracyChange = moveStgs.accuracyChance;
        move.animationId = moveStgs.animationId;
        move.power = moveStgs.power;
        move.criticalChance = moveStgs.criticalChance;
        move.staminaLossScalar = moveStgs.staminaLossScalar;
        move.trainerLevelMin = moveStgs.trainerLevelMin;
        move.trainerLevelMax = moveStgs.trainerLevelMax;
        move.vfxName = moveStgs.vfxName;
        move.durationMs = moveStgs.durationMs;
        move.damageWindowStartMs = moveStgs.damageWindowStartMs;
        move.damageWindowEndMs = moveStgs.damageWindowEndMs;
        move.energyDelta = moveStgs.energyDelta;
        move.id = moveStgs.movementId;
        return move;
  }
}