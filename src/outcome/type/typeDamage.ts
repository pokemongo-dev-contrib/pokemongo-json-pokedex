
export interface TypeDamage {
    /**
     * The id of the type
     * @example
     * POKEMON_TYPE_NORMAL
     */
    id: string;
    /**
     * The attack scalar the type has,
     * compared to this Type
     * @example
     * 0.714
     */
    attackScalar: number;
}
