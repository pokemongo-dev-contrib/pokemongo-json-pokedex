import { Identifyable } from '@core';

export interface EvolutionCostToEvolve {
    /**
     * The amount of candy the Pokemon needs in order to evolve
     */
    candyCost: number,
    /**
     * The item which is required in order to evolve.
     */
    evolutionItem?: Identifyable;
    /**
     * The amount of kilometers a player must walk in order to
     * evolve it
     */
    kmBuddyDistance?: number;
}