import { Identifyable } from '@core/identifyable';

export class Move implements Identifyable {
    public name: string;
    public id: string;
    public animationId: number;
    public pokemonType: Identifyable;
    public power: number;
    public accuracyChange: number;
    public criticalChance: number;
    public staminaLossScalar: number;
    public trainerLevelMin: number;
    public trainerLevelMax: number;
    public vfxName: string;
    public durationMs: number;
    public damageWindowStartMs: number;
    public damageWindowEndMs: number;
    public energyDelta: number;
}