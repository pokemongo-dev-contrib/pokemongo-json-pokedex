import { Identifyable } from '../../core/identifyable';

interface PokemonStats {
    baseStamina: number;
    baseAttack: number;
    baseDefense: number;
}

interface PokemonEncounter {
    baseFleeRate: number;
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
    public modelScale: number;
    public types: Identifyable[];
    public encounter: PokemonEncounter;
    public camera: PokemonCamera;
    public stats: PokemonStats;
    public quickMoves: Identifyable[];
    public cinematicMoves: Identifyable[];
    public animationTime: number[];
    public evelutionPips: number;
    public rarity: Identifyable;
    public height: number;
    public weight: number;
    public family: Identifyable;
    public kmBuddyDistance: number;
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

class EvolutionTree implements Identifyable {
    /**
     * An EvolutionTree represents all possible future evolutions of a pokemon.
     * Mutually exclusive choices are given on the same level, while sequential
     * choices are presented in increasing depth.
     * 
     * For example, Eevee's EvolutionTree would take 6 objects in depth 2, but
     * Charmander's EvolutionTree would take 3 objects in depth 3.
     */
    public name: string;
    public id: string;
    public futureEvolutions: EvolutionTree[]
}

export { Pokemon, EvolutionTree };