import { BadgeNormalizer, ItemNormalizer } from './normalizers/index.js';
import _ from 'lodash';
import fs from 'fs';

class Normalizer {
    
    static Save(type, data){
        const dir = 'output';
        
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        fs.writeFile('output/' + type + '.json', JSON.stringify(data));
    }
    static Normalize(data) {
        const groupedAssets = _.chain(data.Items)
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
        this.Save('Badge', BadgeNormalizer.Normalize(groupedAssets.Badge));
        this.Save('Item', ItemNormalizer.Normalize(groupedAssets.Item));
    }
}

module.exports = Normalizer;