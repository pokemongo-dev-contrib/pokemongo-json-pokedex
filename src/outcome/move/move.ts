import { Identifyable } from '@core/identifyable';

export interface Move extends Identifyable {
    name: string;
    id: string;
    internalId: number;
    animationId: number;
    pokemonType: Identifyable;
    power: number;
    accuracyChange: number;
    criticalChance: number;
    staminaLossScalar: number;
    trainerLevelMin: number;
    trainerLevelMax: number;
    vfxName: string;
    durationMs: number;
    damageWindowStartMs: number;
    damageWindowEndMs: number;
    energyDelta: number;
}
