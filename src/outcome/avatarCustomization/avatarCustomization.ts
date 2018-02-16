import { Identifyable } from '@core/identifyable';
export class AvatarCustomization {
    /**
     * If it is enabled in the shop or not
     */
    public enabled: boolean;
    /**
     * For which gender the customization is
     * @example
     * "male"
     * "female"
     */
    public gender: string;
    /**
     * In which slot the customization can be used
     * @example
     * "Shoes", "Shirt", "Belt", ...
     */
    public slot: string[];
    /**
     * The name of the Avatar Customization
     */
    public name: string;
    /**
     * The unique identification
     * @example
     * "f_shirt_tshirt_pikachu_6"
     */
    public id: string;
    /**
     * When the player unlocks this customization
     * @example
     * 30
     */
    public unlockPlayerLevel: number;
    /**
     * In which category this customization is
     * @example
     * "Shirt", "Shoes"
     */
    public category: string;
    /**
     * The level to unlock the badge
     * @example
     * 10
     */
    public unlockBadgeLevel?: number;
    /**
     * The name of the icon
     * @example
     * f_gloves_battlegirl_bundle_icon
     */
    public iconName: string;
}