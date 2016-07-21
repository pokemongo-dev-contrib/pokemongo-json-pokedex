import {FormatName} from '../lib/helper';
import _ from 'lodash';

class BadgeNormalizer {
    static Normalize(badgesRaw) {
        return badgesRaw.map((badgeRaw) => {
            return {
                type: badgeRaw.type,
                id: badgeRaw.id,
                formattedName: FormatName(badgeRaw.data.BadgeType, 1),
                ranks: badgeRaw.data.BadgeRanks
            };
        });
    }
}

module.exports = BadgeNormalizer;