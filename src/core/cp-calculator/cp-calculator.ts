import AppSettings from '../../app.settings';

export class CPCalculator {
    public static Calculate(baseStamina, baseAttack, baseDefense): number {
        // Stamina = (BaseStamina + IndividualStamina) * TotalCPMultiplier
        let stamina = baseStamina * AppSettings.CP_MULTIPLIER;
        // Attack = (BaseAttack + IndividualAttack) * TotalCpMultiplier
        let attack = baseAttack * AppSettings.CP_MULTIPLIER;
        // Defense = (BaseDefense + IndividualDefense) * TotalCpMultiplier
        let defense = baseDefense = AppSettings.CP_MULTIPLIER;

        // CP = MAX(10, FLOOR(Stamina^0.5 * Attack * Def^0.5 / 10))
        return Math.max(
            Math.floor(
                Math.pow(stamina, 0.5) * attack * Math.pow(defense, 0.5) / 10
            )
        )
    }
}