import { Identifyable } from 'core/identifyable.interface';

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
    public buddySize: Identifyable;
    public modelHeight: number;
}

export { Pokemon };