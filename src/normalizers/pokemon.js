import {FormatName} from '../lib/helper';
import _ from 'lodash';

class PokemonNormalizer {
    static Normalize(pokemonsRaw, moves) {
        return pokemonsRaw.map((pokemonRaw) => {
            let [Id, Type, Name] = _(pokemonRaw.data.UniqueId)
                .split('_')
                .value();
            Id = parseInt(Id.substring(1, Id.length));
            let Types = [];
            if (pokemonRaw.data.Type1 !== undefined) {
                Types.push(FormatName(pokemonRaw.data.Type1, 2));
            }
            if (pokemonRaw.data.Type2 !== undefined) {
                Types.push(FormatName(pokemonRaw.data.Type2, 2));
            }
            let Moves = pokemonRaw.data.QuickMoves
                .substring(1, pokemonRaw.data.QuickMoves.length - 1)
                .split('\\001');
            Moves = Moves.map(id => {
                return parseInt(id.substring(1), 8);
            }).filter(id => { return !isNaN(id); });


            const specialMoves = [];
            let specialMovesStr = pokemonRaw.data.CinematicMoves;
            specialMovesStr = specialMovesStr.substring(1, specialMovesStr.length - 1);
            const specialMovesFromOct = specialMovesStr.match(/(\\\d{3})/g);
            if (specialMovesFromOct) {
                specialMovesFromOct.forEach(moveOct => {
                    specialMovesStr = specialMovesStr.replace(moveOct, "");
                    const move = moves.find(m => m.Id === parseInt(moveOct.substring(1), 8));
                    if (move !== undefined) {
                        specialMoves.push(move.Id);
                    }
                });
            }
            specialMovesStr.split("").forEach(s => {
                specialMoves.push(moves.find(m => m.Id === s.charCodeAt(0)).Id);
            });

            let pokemon = {
                Type: pokemonRaw.type,
                Id: Id,
                Name: Name.toLowerCase().capitalizeFirstLetter(),
                Types: Types,
                Moves: Moves,
                SpecialMoves: specialMoves,
                Encounter: {
                    BaseCaptureRate: pokemonRaw.data.Encounter.BaseCaptureRate,
                    BaseFleeRate: pokemonRaw.data.Encounter.BaseFleeRate,
                    DodgeInterval: pokemonRaw.data.Encounter.MovementTimerS,
                    AttackTimer: pokemonRaw.data.Encounter.AttackTimerS
                },
                Stats: pokemonRaw.data.Stats,
                AverageHeight: pokemonRaw.data.PokedexHeightM,
                AverageWeight: pokemonRaw.data.PokedexWeightKg
            };
            if (pokemonRaw.data.Evolution !== undefined) {
                pokemon.EvolutionId = parseInt(pokemonRaw.data.Evolution.replace('"', '').replace('\\', ''));
            }
            return _.omitBy(pokemon, _.isNil);
        });
    }
}

module.exports = PokemonNormalizer;