import { Move } from '../src/components/move';
import { Pokemon } from '../src/components/pokemon';
import { expect } from 'chai';

describe('Pokemon Output', () => {
    let input: Pokemon[];
    let moves: Move[];
    beforeEach(() => {
        input = require('../output/pokemon.json');
        moves = require('../output/move.json');
    });

    it('should have items', () => {
        expect(input.length).to.not.equal(0);
        expect(input.length).to.equal(251);
    });

    it('should have values', () => {
        const testFunctions = [
            item => expect(Array.isArray(item.animationTime)).to.equal(true, 'animationTime type'),
            item => expect(item.animationTime.length).to.not.equal(0, 'animationTime length'),
            item => expect(item.id).to.not.equal(undefined, 'id'),
            item => expect(item.name).to.not.equal(undefined, 'name'),
            item => expect(item.dex).to.be.within(1, 251, 'dex'),
            item => expect(Array.isArray(item.cinematicMoves)).to.equal(true, 'cinematicMoves type'),
            item => expect(item.cinematicMoves.length).to.not.equal(0, 'cinematicMoves length'),
            item => expect(Array.isArray(item.quickMoves)).to.equal(true, 'quickMoves array'),
            item => expect(item.quickMoves.length).to.not.equal(0, 'quickMoves length'),
            item => expect(typeof item.family).to.equal('object', 'family type'),
            item => expect(item.family.id).to.not.equal(undefined, 'family.id'),
            item => expect(item.family.name).to.not.equal(undefined, 'family.name'),
            item => expect(item.height).to.not.equal(undefined, 'height'),
            item => expect(item.modelHeight).to.not.equal(undefined, 'modelHeight'),
            item => expect(item.kmBuddyDistance).to.not.equal(undefined, 'kmBuddyDistance'),
            item => expect(item.weight).to.not.equal(undefined, 'weight'),
            item => expect(typeof item.stats).to.equal('object', 'stats type'),
            item => expect(item.stats.baseAttack).to.not.equal(undefined, 'stats.baseAttack'),
            item => expect(item.stats.baseDefense).to.not.equal(undefined, 'stats.baseDefense'),
            item => expect(item.stats.baseDefense).to.not.equal(undefined, 'stats.baseDefense'),
            item => expect(Array.isArray(item.types)).to.equal(true, 'types type'),
            item => item.types.forEach(type => expect(type.id).to.not.equal(undefined, 'type id')),
            item => item.types.forEach(type => expect(type.name).to.not.equal(undefined, 'type name')),
            item => expect(typeof item.encounter).to.equal('object', 'encounter type'),
            item => expect(item.encounter.attackProbability).to.not.equal(undefined, 'encounter.attackProbability'),
            item => expect(item.encounter.attackTimer).to.not.equal(undefined, 'encounter.attackTimer'),
            item => expect(item.encounter.baseFleeRate).to.not.equal(undefined, 'encounter.baseFleeRate'),
            item => expect(item.encounter.cameraDistance).to.not.equal(undefined, 'encounter.cameraDistance'),
            item => expect(item.encounter.collisionRadius).to.not.equal(undefined, 'encounter.collisionRadius'),
            item => expect(item.encounter.dodgeDistance).to.not.equal(undefined, 'encounter.dodgeDistance'),
            item => expect(item.encounter.maxPokemonActionFrequency).to.not.equal(undefined, 'encounter.maxPokemonActionFrequency'),
            item => expect(item.encounter.minPokemonActionFrequency).to.not.equal(undefined, 'encounter.minPokemonActionFrequency'),
            item => expect(typeof item.camera).to.equal('object', 'camera type'),
            item => expect(item.camera.cylinderRadius).to.not.equal(undefined, 'camera.cylinderRadius'),
            item => expect(item.camera.diskRadius).to.not.equal(undefined, 'camera.diskRadius'),
            item => expect(item.name === 'Caterpie' || item.camera.shoulderModeScale !== undefined).to.equal(true, 'camera.shoulderModeScale'),
            item => expect(Array.isArray(item.nextEvolutionBranches || [])).to.equal(true, 'nextEvolutionBranches type'),
        ];

        input.forEach(item => {
            testFunctions.forEach(func => {
                func(item);
            });
        });
    });

    it('should have specific properties for specific pokemon', () => {
        const expectations = {
            'BULBASAUR': [
                item => expect(item.nextEvolutionBranches.length).to.equal(1, 'should have one nextEvolutionBranch for Bulbasaur'),
                item => expect(item.dex).to.equal(1, 'Bulbasaur\'s dex number should be correct')
            ],
            'EEVEE': [
                item => expect(item.nextEvolutionBranches.length).to.equal(5, 'should have 5 nextEvolutionBranches for Eevee'),
                item => expect(item.pastEvolutions, 'Eevee should not have past evolutions').to.equal(undefined),
                item => expect(item.futureEvolutions).to.not.equal(undefined, 'Eevee should have future evolutions defined'),
                item => expect(item.futureEvolutions.futureEvolutions, 'Eevee should have future evolutions').to.not.be.empty,
                item => expect(item.futureEvolutions.futureEvolutions.length).to.equal(5, 'Eevee should have 5 evolutions.'),
                item => expect(item.futureEvolutions.futureEvolutions[0].futureEvolutions.length, 'Eevee\'s future evolutions should not evolve').to.equal(0),

            ],
            'UMBREON': [
                item => expect(item.pastEvolutions).to.not.be.empty,
                item => expect(item.pastEvolutions.length).to.equal(1, 'Umbreon should only have one pastEvolution'),
                item => expect(item.pastEvolutions[0].id).to.equal('EEVEE', 'Umbreon\'s only pastEvolution should be Eevee'),
                item => expect(item.futureEvolutions).to.not.equal(undefined, 'Umbreon should have a defined future evolution tree'),
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Umbreon should not evolve.').to.equal(0)
            ],
            'FLAREON': [
                item => expect(item.pastEvolutions).to.not.be.empty,
                item => expect(item.pastEvolutions.length).to.equal(1, 'Flareon should only have one pastEvolution'),
                item => expect(item.pastEvolutions[0].id).to.equal('EEVEE', 'Flareon\'s only pastEvolution should be Eevee'),
                item => expect(item.futureEvolutions).to.not.equal(undefined, 'Flareon should have a defined future evolution tree'),
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Flareon should not evolve.').to.equal(0)
            ],
            'SNORLAX': [
                item => expect(item.pastEvolutions).to.equal(undefined),
                item => expect(item.futureEvolutions).to.not.equal(undefined, 'Snorlax should have a defined future evolution tree'),
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Snorlax should not evolve.').to.equal(0)
            ],
            'MAGMAR': [
                item => expect(item.pastEvolutions).to.not.be.empty,
                item => expect(item.pastEvolutions.length).to.equal(1, 'Magmar should only have one pastEvolution'),
                item => expect(item.pastEvolutions[0].id).to.equal('MAGBY', 'Magmar\'s only pastEvolution should be Magby'),
                item => expect(item.futureEvolutions).to.not.equal(undefined, 'Magmar should have a defined future evolution tree'),
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Magmar should not evolve.').to.equal(0)
            ],
            'GOLDUCK': [
                item => expect(item.pastEvolutions).to.not.be.empty,
                item => expect(item.pastEvolutions.length).to.equal(1, 'Golduck should only have one pastEvolution'),
                item => expect(item.pastEvolutions[0].id).to.equal('PSYDUCK', 'Golduck\'s pastEvolution should be Psyduck'),
                item => expect(item.futureEvolutions).to.not.equal(undefined, 'Golduck should have a defined future evolution tree'),
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Golduck should not evolve.').to.equal(0)
            ],
            'CHARIZARD': [
                item => expect(item.pastEvolutions.length).to.not.equal(0),
                item => expect(item.pastEvolutions.length).to.equal(2, 'Charizard should have 2 pastEvolutions'),
                item => expect(item.pastEvolutions[0].id).to.equal('CHARMANDER', 'Charizard\'s first pastEvolution should be Charmander.'),
                item => expect(item.pastEvolutions[1].id).to.equal('CHARMELEON', 'Charizard\'s second pastEvolution should be Charmeleon.'),
                item => expect(item.futureEvolutions).to.not.equal(undefined, 'Charizard should have a defined future evolution tree'),
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Charizard should not evolve.').to.equal(0)
            ],
            'CHARMANDER': [
                item => expect(item.pastEvolutions).to.equal(undefined),
                item => expect(item.futureEvolutions).to.not.equal(undefined, 'Charmander should have future evolutions'),
                item => expect(item.futureEvolutions.futureEvolutions, 'Charmander should have a future evolution').to.not.be.empty,
                item => expect(item.futureEvolutions.futureEvolutions[0].id).to.equal('CHARMELEON', 'Charmander\'s first futureEvolution should be Charmeleon'),
                item => expect(item.futureEvolutions.futureEvolutions[0].futureEvolutions, 'Charmander should have two future evolutions').to.not.be.empty,
                item => expect(item.futureEvolutions.futureEvolutions[0].futureEvolutions[0].id).to.equal('CHARIZARD', 'Charmander\'s second futureEvolution should be Charizard'),
            ],
            'TYROGUE': [
                item => expect(item.nextEvolutionBranches.length).to.equal(3, 'should have 3 nextEvolutionBranches for Tyrogue'),
                item => expect(item.pastEvolutions, 'Tyrogue should not have past evolutions').to.equal(undefined),
                item => expect(item.futureEvolutions).to.not.equal(undefined, 'Tyrogue should have future evolutions defined'),
                item => expect(item.futureEvolutions.futureEvolutions, 'Tyrogue should have future evolutions').to.not.be.empty,
                item => expect(item.futureEvolutions.futureEvolutions.length).to.equal(3, 'Tyrogue should have 3 evolutions.'),
                item => expect(item.futureEvolutions.futureEvolutions[0].futureEvolutions.length, 'Tyrogue\'s future evolutions should not evolve').to.equal(0),
                item => expect(item.dex).to.equal(236, 'Tyrogue\'s dex number should be correct'),
            ],
            'HITMONLEE': [
                item => expect(item.pastEvolutions).to.not.be.empty,
                item => expect(item.pastEvolutions.length).to.equal(1, 'Hitmonlee should only have one pastEvolution'),
                item => expect(item.pastEvolutions[0].id).to.equal('TYROGUE', 'Hitmonlee\'s only pastEvolution should be Tyrogue'),
                item => expect(item.futureEvolutions).to.not.equal(undefined, 'Hitmonlee should have a defined future evolution tree'),
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Hitmonlee should not evolve.').to.equal(0)
            ],
            'HITMONTOP': [
                item => expect(item.pastEvolutions).to.not.be.empty,
                item => expect(item.pastEvolutions.length).to.equal(1, 'Hitmontop should only have one pastEvolution'),
                item => expect(item.pastEvolutions[0].id).to.equal('TYROGUE', 'Hitmontop\'s only pastEvolution should be Tyrogue'),
                item => expect(item.futureEvolutions).to.not.equal(undefined, 'Hitmontop should have a defined future evolution tree'),
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Hitmontop should not evolve.').to.equal(0)
            ],

        };

        input.forEach(mon => {
            if (mon.id in expectations) {
                let testFunctions = expectations[mon.id];
                testFunctions.forEach(func => {
                    func(mon);
                });
            }
        });
    });

    it('should have malePercent / femalePercent when the Pokémon has a gender', () => {
        input.forEach(pokemon => {
            if (pokemon.encounter.gender) {
                expect(pokemon.encounter.gender.femalePercent).not.to.equal(undefined, `pokemon.encounter.gender.femalePercent ${pokemon.id}`);
                expect(pokemon.encounter.gender.malePercent).not.to.equal(undefined, `pokemon.encounter.gender.malePercent ${pokemon.id}`);
            }
        });
    });

    // it('should match moves', () => {
    //     input.forEach(item => {
    //         if (item.quickMoves) {
    //             item.quickMoves.forEach(quickMove => {
    //                 let filteredMoves = moves.filter(move => move.id == quickMove.id);
    //                 expect(filteredMoves.length).to.not.equal(0, quickMove.id);
    //             });
    //         }
    //         if (item.cinematicMoves) {
    //             item.cinematicMoves.forEach(cinematicMove => {
    //                 let filteredMoves = moves.filter(move => move.id == cinematicMove.id);
    //                 expect(filteredMoves.length).to.not.equal(0, cinematicMove.id);
    //             });
    //         }
    //     });
    // });
});
