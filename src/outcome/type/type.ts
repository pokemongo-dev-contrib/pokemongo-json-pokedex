import { Identifyable } from '@core/identifyable';
import { TypeDamage } from './typeDamage';

export class Type implements Identifyable {
    public name: string;
    public id: string;
    public damage: TypeDamage[];
}

