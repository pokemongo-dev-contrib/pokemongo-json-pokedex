import BadgeNormalizer from './items/badge';
import _ from 'lodash';
import fs from 'fs';

class ItemsNormalizer {
    static Normalize(itemsRaw) {
        const groupedAssets = _.chain(itemsRaw)
        .map(item => {
            const keys = Object.keys(item);
            const itemType = keys.find(k => k !== 'TemplateId');
            return {
                type: itemType,
                id: item.TemplateId,
                data: item[itemType]
            };
        })
        .groupBy('type')
        .value();
        var dir = 'output';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        fs.writeFile('output/output.json', JSON.stringify(groupedAssets));
    }
}

module.exports = ItemsNormalizer;