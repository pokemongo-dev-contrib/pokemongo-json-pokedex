interface PokemonStats {
    baseStamina: number;
    baseAttack: number;
    baseDefense: number;
}

interface PokemonEncounter {
    baseFleeRate: number;
    collisionRadius: number;
    movementType: string;
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
class Pokemon {
    public name: string;
    public modelScale: number;
    public types: string[];
    public encounter: PokemonEncounter;
    public camera: PokemonCamera;
    public stats: PokemonStats;
    public quickMoves: string[];
    public cinematicMoves: string[];
    public animationTime: number[];
    public evelutionPips: number;
    public rarity: string;
    public height: number;
    public weight: number;
    public familyId: string;
    public kmBuddyDistance: number;
    public buddySize: string;
    public modelHeight: number;
}

export { Pokemon };