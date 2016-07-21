import {FormatName} from '../lib/helper';
import _ from 'lodash';

class BadgeNormalizer {
    static Normalize(badgesRaw) {
        return badgesRaw.map((badgeRaw) => {
            return {
                FormattedName: FormatName(badgeRaw.data.BadgeType, 1),
                Ranks: badgeRaw.data.BadgeRanks
            };
        });
    }
}

module.exports = BadgeNormalizer;