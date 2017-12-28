export interface Identifyable {
    name: string;
    id: string;
    candyCost?: number;
    evolutionItem?: Identifyable;
    kmBuddyDistanceRequirement?: number;
}