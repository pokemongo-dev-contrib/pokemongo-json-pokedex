import {FormatName} from '../lib/helper';
import _ from 'lodash';

function isEmpty(map) {
    for (var key in map) {
        if (map.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

class ItemNormalizer {
    static Normalize(itemsRaw) {
        return _.chain(itemsRaw)
            .map((itemRaw) => {
                // General Properties
                let item = {
                    Name: FormatName(itemRaw.id, 1).replace('"', ''),
                    Category: FormatName(itemRaw.data.Category, 2),
                    Id: itemRaw.data.UniqueId,
                    ItemSpecificData: {}
                };
                // Item specific properties
                var itemSpecific = item.ItemSpecificData;
                if (itemRaw.data.InventoryUpgrade !== undefined) {
                    itemSpecific.inventoryUpgrade = {
                        AdditionalStorage: itemRaw.data.InventoryUpgrade.AdditionalStorage,
                        Type: FormatName(itemRaw.data.InventoryUpgrade.UpgradeType, 0)
                    };
                }
                if (itemRaw.data.Potion !== undefined) {
                    itemSpecific.HealAmount = itemRaw.data.Potion.StaAmount;
                }
                if (itemRaw.data.Revive !== undefined) {
                    itemSpecific.HealPercentageAmount = itemRaw.data.Revive.StaPercent;
                }
                if (itemRaw.data.XpBoost !== undefined) {
                    itemSpecific.XpBoost = itemRaw.data.XpBoost;
                }
                if (itemRaw.data.EggIncubator !== undefined) {
                    itemSpecific.EggIncubator = itemRaw.data.EggIncubator;
                    itemSpecific.EggIncubator.IncubatorType = FormatName(itemSpecific.EggIncubator.IncubatorType);
                }
                if (itemRaw.data.Incense !== undefined) {
                    itemSpecific.Incense = itemRaw.data.Incense;
                }
                if (isEmpty(itemSpecific)) {
                    delete item.ItemSpecificData;
                }

                // Clear all properties, which have null, undefined or '' in it
                return _.omitBy(item, _.isNil);
            });
    }
}

module.exports = ItemNormalizer;