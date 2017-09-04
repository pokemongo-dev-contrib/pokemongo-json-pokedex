import { CPCalculator } from './shared/cp-calculator';
import { DexParser } from './shared/dex-parser.component';
import { GenderPercentParser } from './shared/gender-percent-parser.component';
import { ItemTemplate } from '@core/game_master/gameMaster';
import { Pokemon } from './pokemon.model';
import { RootObject } from '@core';
import { Util } from '@util';

export class PokemonMapper {
    public static Map(rawPokemon: ItemTemplate, gameMaster: RootObject): Pokemon {
        let pokemon: Pokemon = new Pokemon();
        let pkmStgs = rawPokemon.pokemonSettings;

        pokemon.dex = new DexParser().Process(rawPokemon.templateId)
        pokemon.animationTime = pkmStgs.animationTime;
        pokemon.id = pkmStgs.pokemonId;
        pokemon.name = Util.SnakeCase2HumanReadable(pkmStgs.pokemonId);

        if (pkmStgs.buddySize) {
            pokemon.buddySize = {
                id: pkmStgs.buddySize,
                name: Util.SnakeCase2HumanReadable(pkmStgs.buddySize
                    .replace('BUDDY_', ''))
            }
        }

        pokemon.cinematicMoves = pkmStgs.cinematicMoves.map(Util.SnakeCase2Identifyable);
        pokemon.quickMoves = pkmStgs.quickMoves.map(Util.SnakeCase2Identifyable);

        pokemon.family = {
            id: pkmStgs.familyId,
            name: Util.SnakeCase2HumanReadable(pkmStgs.familyId
                .replace('FAMILY_', ''))
        };

        pokemon.height = pkmStgs.pokedexHeightM;
        pokemon.modelHeight = pkmStgs.modelHeight;
        pokemon.kmBuddyDistance = pkmStgs.kmBuddyDistance;
        pokemon.weight = pkmStgs.pokedexWeightKg;

        pokemon.stats = {
            baseAttack: pkmStgs.stats.baseAttack,
            baseDefense: pkmStgs.stats.baseDefense,
            baseStamina: pkmStgs.stats.baseStamina
        };

        pokemon.types = [];

        if (pkmStgs.type) {
            pokemon.types.push({
                id: pkmStgs.type,
                name: Util.SnakeCase2HumanReadable(pkmStgs.type
                    .replace('POKEMON_TYPE_', ''))
            });
        }

        if (pkmStgs.type2) {
            pokemon.types.push({
                id: pkmStgs.type2,
                name: Util.SnakeCase2HumanReadable(pkmStgs.type2.replace('POKEMON_TYPE_', ''))
            });
        }

        if (pkmStgs.rarity) {
            pokemon.rarity = {
                id: pkmStgs.rarity,
                name: Util.SnakeCase2HumanReadable(pkmStgs.rarity
                    .replace('POKEMON_RARITY_', ''))
            };
        }

        pokemon.modelScale = rawPokemon.pokemonSettings.modelScale;

        // Pokemon Encounter
        pokemon.encounter = {
            attackProbability: pkmStgs.encounter.attackProbability,
            attackTimer: pkmStgs.encounter.attackTimerS,
            baseFleeRate: pkmStgs.encounter.baseFleeRate,
            baseCaptureRate: pkmStgs.encounter.baseCaptureRate,
            cameraDistance: pkmStgs.encounter.cameraDistance,
            collisionRadius: pkmStgs.encounter.collisionRadiusM,
            dodgeDistance: pkmStgs.encounter.dodgeDistance,
            dodgeProbability: pkmStgs.encounter.dodgeProbability,
            jumpTime: pkmStgs.encounter.jumpTimeS,
            maxPokemonActionFrequency: pkmStgs.encounter.maxPokemonActionFrequencyS,
            minPokemonActionFrequency: pkmStgs.encounter.minPokemonActionFrequencyS,
            movementType: pkmStgs.encounter.movementType ? Util.SnakeCase2Identifyable(pkmStgs.encounter.movementType) : null,
        };

        // Pokemon Gender
        const gender = new GenderPercentParser(gameMaster).Process(pokemon.id);
        if (gender) {
            pokemon.encounter.gender = gender;
        }

        // Pokemon Camera
        pokemon.camera = {
            cylinderGround: pkmStgs.camera.cylinderGroundM,
            cylinderRadius: pkmStgs.camera.cylinderRadiusM,
            diskRadius: pkmStgs.camera.diskRadiusM,
            shoulderModeScale: pkmStgs.camera.shoulderModeScale
        };
        // Pokemon Evolutions
        pokemon.nextEvolutionBranches = (pkmStgs.evolutionBranch || []).map(branch => Util.SnakeCase2Identifyable(branch.evolution));

        pokemon.maxCP = CPCalculator
            .Calculate(pokemon.stats.baseStamina, pokemon.stats.baseAttack, pokemon.stats.baseDefense);

        return pokemon;
    }
}
