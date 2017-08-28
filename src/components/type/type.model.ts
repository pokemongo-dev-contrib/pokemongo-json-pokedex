import { Identifyable } from '@core/identifyable';

class Type implements Identifyable {
    public name: string;
    public id: string;
    public damage: object;
}

export { Type };
