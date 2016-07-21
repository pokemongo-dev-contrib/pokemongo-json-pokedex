import {FormatName} from '../lib/helper';
import _ from 'lodash';

class BadgeNormalizer {
    static Normalize(badgesRaw) {
        return badgesRaw.map((badgeRaw) => {
            return {
                Type: badgeRaw.type,
                Id: badgeRaw.id,
                FormattedName: FormatName(badgeRaw.data.BadgeType, 1),
                Ranks: badgeRaw.data.BadgeRanks
            };
        });
    }
}

module.exports = BadgeNormalizer;