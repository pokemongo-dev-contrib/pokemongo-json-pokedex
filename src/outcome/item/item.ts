import { Identifyable } from '../../core/identifyable';

export class ItemEffect implements Identifyable {
    /**
     * The unique id of the effect
     */
    public id: string;
    /**
     * The human readable name of the effect
     */
    public name: string;
    /**
     * The effectiveness of the effect in percent
     */
    public effectPercent: number;
}

export class ItemFood {
    /**
     * Effect of the item (e.g. Berry effect)
     */
    public effect: ItemEffect[];
    /**
     * The amount of growth in percent
     */
    public growthPercent: number;
    /**
     * Unknown
     */
    public berryMultiplier?: number;
}

export class ItemPotion {
    /**
     * The amount of stamina which gets recharged
     */
    staminaAmount: number;
    /**
     * The percent of stamina which gets recharged
     */
    staminaPercent: number;
}

export class Item {
    /**
     * The identifier of the item
     */
    public id: string;
    /**
     * The human readable name of the item
     */
    public name: string;
    /**
     * The category of the item
     * e.g. ITEM_CATEGORY_FOOD
     */
    public category: Identifyable;
    /**
     * The level on which level this item gets dropped
     */
    public dropTrainerLevel: number;
    /**
     * The type of the item.
     * e.g. Food
     */
    public type: Identifyable;
    /**
     * Data of a food item
     */
    public food?: ItemFood;
    /**
     * Data of a potion item
     */
    public potion?: ItemPotion;
    /**
     * Data of a potion item
     */
    public revive?: ItemPotion;
}
