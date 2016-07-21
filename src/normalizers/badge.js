import '../lib/helper';
import _ from 'lodash';

class BadgeNormalizer {
    static Normalize(badgesRaw) {
        return badgesRaw.map((badgeRaw) => {
            let formattedName = _.chain(badgeRaw.data.BadgeType)
                .split('_')
                .drop(1)
                .value()
                .map((part) => {
                    return part.toLowerCase().capitalizeFirstLetter();
                })
                .join(' ');
            return {
                type: badgeRaw.type,
                id: badgeRaw.id,
                formattedName: formattedName,
                ranks: badgeRaw.data.BadgeRanks
            };
        });
    }
}

module.exports = BadgeNormalizer;