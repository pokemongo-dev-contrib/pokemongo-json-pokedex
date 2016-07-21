import {FormatName} from '../lib/helper';
import _ from 'lodash';

class MoveNormalizer {
    static Normalize(movesRaw) {
        return movesRaw.map((moveRaw) => {
            let [Id, Type, Name] = _(moveRaw.data.UniqueId)
                .split('_')
                .value();
            Id = parseInt(Id.substring(1, Id.length));
            return {
                Id : Id,
                Name: FormatName(moveRaw.data.UniqueId, 2),
                Type : FormatName(moveRaw.data.Type, 2),
                Power : moveRaw.data.Power,
                Accuracy: moveRaw.data.AccuracyChance,
                CriticalChance: moveRaw.data.CriticalChance,
                TrainerLevelMin: moveRaw.data.TrainerLevelMin,
                TrainerLevelMax: moveRaw.data.TrainerLevelMax,
                Duration: moveRaw.data.DurationMs
            }
        });
    }
}

module.exports = MoveNormalizer;