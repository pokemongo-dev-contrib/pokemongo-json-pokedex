import { Identifyable } from '../../core/identifyable';

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
    public itemType: Identifyable;
}
