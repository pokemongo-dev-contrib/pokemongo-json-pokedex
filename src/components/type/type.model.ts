import { Identifyable } from '@core/identifyable';

interface TypeDamage {
  id: string;
  attackScalar: number;
}

class Type implements Identifyable {
    public name: string;
    public id: string;
    public damage: TypeDamage[];
}

export { Type };
