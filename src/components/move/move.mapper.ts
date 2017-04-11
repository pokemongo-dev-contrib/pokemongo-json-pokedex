import { ItemTemplate } from '@core/game_master';
import { Move } from './';
import { Util } from '@util';

export class MoveMapper {
    public static Map(rawMove: ItemTemplate): Move {
        let move: Move = new Move();
        let moveStgs = rawMove.moveSettings;
        move.accuracyChange = moveStgs.accuracyChance;
        move.animationId = moveStgs.animationId;
        move.pokemonType = {
            id: moveStgs.pokemonType,
            name: Util.SnakeCase2HumanReadable(moveStgs.pokemonType
                .replace('POKEMON_TYPE_', ''))
        }
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
        move.name = Util.SnakeCase2HumanReadable(moveStgs.movementId);
        return move;
    }
}