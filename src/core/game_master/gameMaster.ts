export interface AvatarCustomization {
    enabled: boolean;
    avatarType: string;
    slot: string[];
    bundleName: string;
    assetName: string;
    groupName: string;
    sortOrder: number;
    unlockType: string;
    iapSku: string;
    iconName: string;
    unlockPlayerLevel?: number;
}

export interface BadgeSettings {
    badgeType: string;
    badgeRank: number;
    targets: number[];
}

export interface BattleSettings {
    retargetSeconds: number;
    enemyAttackInterval: number;
    attackServerInterval: number;
    roundDurationSeconds: number;
    bonusTimePerAllySeconds: number;
    maximumAttackersPerBattle: number;
    sameTypeAttackBonusMultiplier: number;
    maximumEnergy: number;
    energyDeltaPerHealthLost: number;
    dodgeDurationMs: number;
    minimumPlayerLevel: number;
    swapDurationMs: number;
    dodgeDamageReductionPercent: number;
}

export interface EncounterSettings {
    spinBonusThreshold: number;
    excellentThrowThreshold: number;
    greatThrowThreshold: number;
    niceThrowThreshold: number;
    milestoneThreshold: number;
}

export interface Form {
    form: string;
    assetBundleValue: number;
}

export interface FormSettings {
    pokemon: string;
    forms: Form[];
}

export interface GymLevel {
    requiredExperience: number[];
    leaderSlots: number[];
    trainerSlots: number[];
}

export interface IapSettings {
    dailyDefenderBonusPerPokemon: number[];
    dailyDefenderBonusMaxDefenders: number;
    dailyDefenderBonusCurrency: string[];
    minTimeBetweenClaimsMs: string;
    dailyDefenderBonusEnabled: boolean;
}

export interface Food {
    itemEffect: string[];
    itemEffectPercent: number[];
    growthPercent: number;
}

export interface Potion {
    staAmount: number;
    staPercent?: number;
}

export interface Incense {
    incenseLifetimeSeconds: number;
    standingTimeBetweenEncountersSeconds: number;
    movingTimeBetweenEncounterSeconds: number;
    distanceRequiredForShorterIntervalMeters: number;
}

export interface EggIncubator {
    incubatorType: string;
    uses: number;
    distanceMultiplier: number;
}

export interface InventoryUpgrade {
    additionalStorage: number;
    upgradeType: string;
}

export interface XpBoost {
    xpMultiplier: number;
    boostDurationMs: number;
}

export interface Revive {
    staPercent: number;
}

export interface ItemSettings {
    itemId: string;
    itemType: string;
    category: string;
    dropTrainerLevel: number;
    food: Food;
    potion: Potion;
    incense: Incense;
    eggIncubator: EggIncubator;
    inventoryUpgrade: InventoryUpgrade;
    xpBoost: XpBoost;
    revive: Revive;
}

export interface PlayerLevel {
    rankNum: number[];
    requiredExperience: number[];
    cpMultiplier: number[];
    maxEggPlayerLevel: number;
    maxEncounterPlayerLevel: number;
}

export interface TypeEffective {
    attackScalar: number[];
    attackType: string;
}

export interface PokemonUpgrades {
    upgradesPerLevel: number;
    allowedLevelsAbovePlayer: number;
    candyCost: number[];
    stardustCost: number[];
}

export interface DailyQuest {
    bucketsPerDay: number;
    streakLength: number;
    bonusMultiplier?: number;
    streakBonusMultiplier?: number;
}

export interface QuestSettings {
    questType: string;
    dailyQuest: DailyQuest;
}

export interface Gender {
    malePercent: number;
    femalePercent: number;
    genderlessPercent?: number;
}

export interface GenderSettings {
    pokemon: string;
    gender: Gender;
}

export interface Camera {
    diskRadiusM: number;
    cylinderRadiusM: number;
    cylinderHeightM: number;
    shoulderModeScale: number;
    cylinderGroundM?: number;
}

export interface Encounter {
    baseCaptureRate: number;
    baseFleeRate: number;
    collisionRadiusM: number;
    collisionHeightM: number;
    collisionHeadRadiusM: number;
    movementType: string;
    movementTimerS: number;
    jumpTimeS: number;
    attackTimerS: number;
    attackProbability: number;
    dodgeProbability: number;
    dodgeDurationS: number;
    dodgeDistance: number;
    cameraDistance: number;
    minPokemonActionFrequencyS: number;
    maxPokemonActionFrequencyS: number;
    bonusCandyCaptureReward?: number;
    bonusStardustCaptureReward?: number;
}

export interface Stats {
    baseStamina: number;
    baseAttack: number;
    baseDefense: number;
}

export interface EvolutionBranch {
    evolution: string;
    candyCost: number;
    evolutionItemRequirement: string;
}

export interface PokemonSettings {
    pokemonId: string;
    modelScale: number;
    type: string;
    type2: string;
    camera: Camera;
    encounter: Encounter;
    stats: Stats;
    quickMoves: string[];
    cinematicMoves: string[];
    animationTime: number[];
    evolutionIds: string[];
    evolutionPips: number;
    pokedexHeightM: number;
    pokedexWeightKg: number;
    heightStdDev: number;
    weightStdDev: number;
    familyId: string;
    candyToEvolve: number;
    kmBuddyDistance: number;
    modelHeight: number;
    evolutionBranch: EvolutionBranch[];
    parentPokemonId: string;
    buddySize: string;
    rarity: string;
}

export interface MoveSettings {
    movementId: string;
    animationId: number;
    pokemonType: string;
    power: number;
    accuracyChance: number;
    criticalChance: number;
    staminaLossScalar: number;
    trainerLevelMin: number;
    trainerLevelMax: number;
    vfxName: string;
    durationMs: number;
    damageWindowStartMs: number;
    damageWindowEndMs: number;
    energyDelta: number;
    healScalar?: number;
}

export interface IapItemDisplay {
    sku: string;
    category: string;
    sortOrder: number;
    itemIds: string[];
    counts: number[];
}

export interface Camera2 {
    interpolation: string[];
    targetType: string[];
    easeInSpeed: number[];
    eastOutSpeed: number[];
    durationSeconds: number[];
    waitSeconds: number[];
    transitionSeconds: number[];
    angleDegree: number[];
    angleOffsetDegree: number[];
    pitchDegree: number[];
    pitchOffsetDegree: number[];
    rollDegree: number[];
    distanceMeters: number[];
    heightPercent: number[];
    vertCtrRatio: number[];
    nextCamera: string;
}

export interface MoveSequenceSettings {
    sequence: string[];
}

export interface ItemTemplate {
    templateId: string;
    avatarCustomization: AvatarCustomization;
    badgeSettings: BadgeSettings;
    battleSettings: BattleSettings;
    encounterSettings: EncounterSettings;
    formSettings: FormSettings;
    gymLevel: GymLevel;
    iapSettings: IapSettings;
    itemSettings: ItemSettings;
    playerLevel: PlayerLevel;
    typeEffective: TypeEffective;
    pokemonUpgrades: PokemonUpgrades;
    questSettings: QuestSettings;
    genderSettings: GenderSettings;
    pokemonSettings: PokemonSettings;
    moveSettings: MoveSettings;
    iapItemDisplay: IapItemDisplay;
    camera: Camera2;
    moveSequenceSettings: MoveSequenceSettings;
}

export interface RootObject {
    itemTemplates: ItemTemplate[];
    timestampMs: string;
    version: string;
}


