import {FormatName} from '../lib/helper';
import _ from 'lodash';

class MoveNormalizer {
    static Normalize(movesRaw) {
        console.log(movesRaw);
        return movesRaw.map((moveRaw) => {
            let numericId = moveRaw.id.substring(1, moveRaw.id.length - 1);
            numericId = numericId.split("_");
            numericId = parseInt(numericId[0].substring(1))

            return {
                Id: numericId,
                Name: FormatName(moveRaw.data.VfxName.substring(1, moveRaw.data.VfxName.length - 1), 0).replace('Fast', '').trim(),
                Type: FormatName(moveRaw.data.Type, 2),
                Power: moveRaw.data.Power,
                Accuracy: moveRaw.data.AccuracyChance,
                CriticalChance: moveRaw.data.CriticalChance,
                TrainerLevelMin: moveRaw.data.TrainerLevelMin,
                TrainerLevelMax: moveRaw.data.TrainerLevelMax,
                Duration: moveRaw.data.DurationMs
            };
        });
    }
}

module.exports = MoveNormalizer;