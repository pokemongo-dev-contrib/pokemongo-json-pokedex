import { EvolutionTree } from './shared/evolution-tree'
import { Identifyable } from '@core/identifyable';

interface PokemonStats {
    baseStamina: number;
    baseAttack: number;
    baseDefense: number;
}

interface PokemonEncounter {
    baseFleeRate: number;
    baseCaptureRate: number;
    collisionRadius: number;
    movementType?: Identifyable;
    jumpTime: number;
    attackTimer: number;
    attackProbability: number;
    dodgeProbability: number;
    dodgeDistance: number;
    cameraDistance: number;
    minPokemonActionFrequency: number;
    maxPokemonActionFrequency: number;
    gender?: PokemonGender;
}

/**
 * Information about the gender of the Pokémon
 */
interface PokemonGender {
    /*
     * The chance of the Pokémon being male. 100% = 1, 0% = 0
     * @example
     * 0.875
     */
    malePercent: number;
    /*
     * The chance of the Pokémon being female. 100% = 1, 0% = 0
     * @example
     * 0.125
     */
    femalePercent: number;
}

interface PokemonCamera {
    diskRadius: number;
    cylinderRadius: number;
    cylinderGround: number;
    shoulderModeScale: number;
}

class Pokemon implements Identifyable {
    public name: string;
    public id: string;
    public dex: number;
    public modelScale: number;
    public types: Identifyable[];
    public encounter: PokemonEncounter;
    public camera: PokemonCamera;
    public stats: PokemonStats;
    public quickMoves: Identifyable[];
    public cinematicMoves: Identifyable[];
    public animationTime: number[];
    public rarity: Identifyable;
    public height: number;
    public weight: number;
    public family: Identifyable;
    public kmBuddyDistance: number;
    public maxCP: number;
    /**
     * The size of the Pokemon, when it is chosen as
     * a buddy.
     */
    public buddySize: Identifyable;
    public modelHeight: number;

    /**
     * What could the player choose to evolve this pokemon into?
     */
    public nextEvolutionBranches: Identifyable[];

    /**
     * All the possible future evolutions of this pokemon, including indirect
     * evolutions. For example, given Charmander, futureEvolutions would list
     * Charmeleon and Charizard.
     */
    public futureEvolutions: EvolutionTree;

    /**
     * All past evolutions of this pokemon, direct and indirect.
     *
     * For Charizard, this field would list Charmander and Charmeleon.
     */
    public pastEvolutions: Identifyable[];
}

export { Pokemon, PokemonGender };
