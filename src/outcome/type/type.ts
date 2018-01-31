import { Identifyable } from '@core/identifyable';
import { TypeDamage } from './typeDamage';

export class Type implements Identifyable {
    /**
     * The name of the Type
     * @example
     * Bug
     */
    public name: string;
    /**
     * The id of the type
     * @example
     * POKEMON_TYPE_BUG
     */
    public id: string;
    /**
     * The array of attack scalars
     */
    public damage: TypeDamage[];
}

