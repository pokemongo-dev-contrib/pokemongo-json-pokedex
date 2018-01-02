import { Move } from '../src/components/move';
import { Pokemon } from '@outcome/pokemon';
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
        expect(input.length).to.equal(386);
    });

    it('should have values', () => {
        const testFunctions = [
            item => expect(Array.isArray(item.animationTime), 'animationTime type').to.equal(true),
            item => expect(item.animationTime.length, 'animationTime length').to.not.equal(0),
            item => expect(item.id, 'id').to.not.equal(undefined),
            item => expect(item.name, 'name').to.not.equal(undefined),
            item => expect(item.dex, 'dex').to.be.within(1, 386),
            item => expect(Array.isArray(item.cinematicMoves), 'cinematicMoves type').to.equal(true),
            item => expect(item.cinematicMoves.length, 'cinematicMoves length').to.not.equal(0),
            item => expect(Array.isArray(item.quickMoves), 'quickMoves array').to.equal(true),
            item => expect(item.quickMoves.length, 'quickMoves length').to.not.equal(0),
            item => expect(typeof item.family, 'family type').to.equal('object'),
            item => expect(item.family.id, 'family.id').to.not.equal(undefined),
            item => expect(item.family.name, 'family.name').to.not.equal(undefined),
            item => expect(item.height, 'height').to.not.equal(undefined),
            item => expect(item.modelHeight, 'modelHeight').to.not.equal(undefined),
            item => expect(item.kmBuddyDistance, 'kmBuddyDistance').to.not.equal(undefined),
            item => expect(item.weight, 'weight').to.not.equal(undefined),
            item => expect(typeof item.stats, 'stats type').to.equal('object'),
            item => expect(item.stats.baseAttack, 'stats.baseAttack').to.not.equal(undefined),
            item => expect(item.stats.baseDefense, 'stats.baseDefense').to.not.equal(undefined),
            item => expect(item.stats.baseDefense, 'stats.baseDefense').to.not.equal(undefined),
            item => expect(Array.isArray(item.types), 'types type').to.equal(true),
            item => item.types.forEach(type => expect(type.id, 'type id').to.not.equal(undefined)),
            item => item.types.forEach(type => expect(type.name, 'type name').to.not.equal(undefined)),
            item => expect(typeof item.encounter, 'encounter type').to.equal('object'),
            item => expect(item.encounter.attackProbability, 'encounter.attackProbability').to.not.equal(undefined),
            item => expect(item.encounter.attackTimer, 'encounter.attackTimer').to.not.equal(undefined),
            item => expect(item.encounter.baseFleeRate, 'encounter.baseFleeRate').to.not.equal(undefined),
            item => expect(item.encounter.cameraDistance, 'encounter.cameraDistance').to.not.equal(undefined),
            item => expect(item.encounter.collisionRadius, 'encounter.collisionRadius').to.not.equal(undefined),
            item => expect(item.encounter.dodgeDistance, 'encounter.dodgeDistance').to.not.equal(undefined),
            item => expect(item.encounter.maxPokemonActionFrequency, 'encounter.maxPokemonActionFrequency').to.not.equal(undefined),
            item => expect(item.encounter.minPokemonActionFrequency, 'encounter.minPokemonActionFrequency').to.not.equal(undefined),
            item => expect(typeof item.camera, 'camera type').to.equal('object'),
            item => expect(item.camera.cylinderRadius, 'camera.cylinderRadius').to.not.equal(undefined),
            item => expect(item.camera.diskRadius, 'camera.diskRadius').to.not.equal(undefined),
            item => expect(item.name === 'Caterpie' || item.camera.shoulderModeScale !== undefined, 'camera.shoulderModeScale').to.equal(true),
            item => expect(Array.isArray(item.nextEvolutionBranches || []), 'nextEvolutionBranches type').to.equal(true),
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
                item => expect(item.nextEvolutionBranches.length, 'should have one nextEvolutionBranch for Bulbasaur').to.equal(1),
                item => expect(item.nextEvolutionBranches[0].candyCost, 'Bulbasaur should require 25 candies to evolve into Ivysaur').to.equal(25),
                item => expect(item.dex, 'Bulbasaur\'s dex number should be correct').to.equal(1)
            ],
            'EEVEE': [
                item => expect(item.nextEvolutionBranches.length, 'should have 5 nextEvolutionBranches for Eevee').to.equal(5),
                item => expect(item.pastEvolutions, 'Eevee should not have past evolutions').to.equal(undefined),
                item => expect(item.futureEvolutions, 'Eevee should have future evolutions defined').to.not.equal(undefined),
                item => expect(item.futureEvolutions.futureEvolutions, 'Eevee should have future evolutions').to.not.be.empty,
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Eevee should have 5 evolutions').to.equal(5),
                item => expect(item.futureEvolutions.futureEvolutions[0].futureEvolutions.length, 'Eevee\'s future evolutions should not evolve').to.equal(0)
            ],
            'UMBREON': [
                item => expect(item.pastEvolutions, 'Umbreon should have past evolution').to.not.be.empty,
                item => expect(item.pastEvolutions.length, 'Umbreon should only have one pastEvolution').to.equal(1),
                item => expect(item.pastEvolutions[0].id, 'Umbreon\'s only pastEvolution should be Eevee').to.equal('EEVEE'),
                item => expect(item.futureEvolutions, 'Umbreon should have a defined future evolution tree').to.not.equal(undefined),
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Umbreon should not evolve').to.equal(0),
                item => expect(item.futureEvolutions.candyCost, 'Umbreon should require 25 candies to evolve from Eevee').to.equal(25)
            ],
            'FLAREON': [
                item => expect(item.pastEvolutions, 'Flareon should have past evolution').to.not.be.empty,
                item => expect(item.pastEvolutions.length, 'Flareon should only have one pastEvolution').to.equal(1),
                item => expect(item.pastEvolutions[0].id, 'Flareon\'s only pastEvolution should be Eevee').to.equal('EEVEE'),
                item => expect(item.futureEvolutions, 'Flareon should have a defined future evolution tree').to.not.equal(undefined),
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Flareon should not evolve').to.equal(0)
            ],
            'SNORLAX': [
                item => expect(item.pastEvolutions, 'Snorlax should not have past evolution').to.equal(undefined),
                item => expect(item.futureEvolutions, 'Snorlax should have a defined future evolution tree').to.not.equal(undefined),
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Snorlax should not evolve').to.equal(0)
            ],
            'SEADRA': [
                item => expect(item.pastEvolutions.length, 'Seadra should have past evolution').to.equal(1),
                item => expect(item.futureEvolutions, 'Seadra should have a defined future evolution tree').to.not.equal(undefined),
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Seadra should evolve').to.equal(1),
                item => expect(item.futureEvolutions.futureEvolutions[0].candyCost, 'Seadra should require 100 candies to evolve into Kingdra').to.equal(100),
                item => expect(item.futureEvolutions.futureEvolutions[0].evolutionItem.id, 'Evolution item ID').to.equal('ITEM_DRAGON_SCALE'),
                item => expect(item.futureEvolutions.futureEvolutions[0].evolutionItem.name, 'Seadra should require Dragon Scale to evolve into Kingdra').to.equal('Dragon Scale')
            ],
            'KINGDRA': [
                item => expect(item.pastEvolutions.length, 'Kingdra should have 2 past evolutions').to.equal(2),
                item => expect(item.pastEvolutions[1].candyCost, 'Seadra should require 25 candies to be evolved from Horsea').to.equal(25),
                item => expect(item.futureEvolutions, 'Kingdra should have a defined future evolution tree').to.not.equal(undefined),
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Kingdra should not evolve').to.equal(0),
                item => expect(item.futureEvolutions.candyCost, 'Kingdra should require 100 candies to be evolved from Seadra').to.equal(100),
                item => expect(item.futureEvolutions.evolutionItem.id, 'Evolution item ID').to.equal('ITEM_DRAGON_SCALE'),
                item => expect(item.futureEvolutions.evolutionItem.name, 'Kingdra should require Dragon Scale to be evolved from Seadra').to.equal('Dragon Scale')
            ],
            'FEEBAS': [
                item => expect(item.pastEvolutions, 'Feebas should not have past evolution').to.equal(undefined),
                item => expect(item.futureEvolutions, 'Feebas should have a defined future evolution tree').to.not.equal(undefined),
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Feebas should evolve').to.equal(1),
                item => expect(item.futureEvolutions.futureEvolutions[0].candyCost, 'Feebas should require 100 candies to evolve into Milotic').to.equal(100),
                item => expect(item.futureEvolutions.futureEvolutions[0].kmBuddyDistanceRequirement, 'Feebas should require 20 km as buddy to evolve into Milotic').to.equal(20)
            ],
            'MILOTIC': [
                item => expect(item.pastEvolutions.length, 'Milotic should have past evolution').to.equal(1),
                item => expect(item.futureEvolutions, 'Milotic should have a defined future evolution tree').to.not.equal(undefined),
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Milotic should not evolve').to.equal(0),
                item => expect(item.futureEvolutions.candyCost, 'Milotic should require 100 candies to be evolved from Feebas').to.equal(100),
                item => expect(item.futureEvolutions.kmBuddyDistanceRequirement, 'Milotic should require 20 km as buddy to be evolved from Feebas').to.equal(20)
            ],
            'MAGMAR': [
                item => expect(item.pastEvolutions, 'Magmar should have past evolution').to.not.be.empty,
                item => expect(item.pastEvolutions.length, 'Magmar should only have one pastEvolution').to.equal(1),
                item => expect(item.pastEvolutions[0].id, 'Magmar\'s only pastEvolution should be Magby').to.equal('MAGBY'),
                item => expect(item.futureEvolutions, 'Magmar should have a defined future evolution tree').to.not.equal(undefined),
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Magmar should not evolve').to.equal(0)
            ],
            'GOLDUCK': [
                item => expect(item.pastEvolutions, 'Golduck should have past evolution').to.not.be.empty,
                item => expect(item.pastEvolutions.length, 'Golduck should only have one pastEvolution').to.equal(1),
                item => expect(item.pastEvolutions[0].id, 'Golduck\'s pastEvolution should be Psyduck').to.equal('PSYDUCK'),
                item => expect(item.futureEvolutions, 'Golduck should have a defined future evolution tree').to.not.equal(undefined),
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Golduck should not evolve').to.equal(0)
            ],
            'CHARIZARD': [
                item => expect(item.pastEvolutions.length, 'Charizard should have 2 pastEvolutions').to.equal(2),
                item => expect(item.pastEvolutions[0].id, 'Charizard\'s first pastEvolution should be Charmander').to.equal('CHARMANDER'),
                item => expect(item.pastEvolutions[1].id, 'Charizard\'s second pastEvolution should be Charmeleon').to.equal('CHARMELEON'),
                item => expect(item.futureEvolutions, 'Charizard should have a defined future evolution tree').to.not.equal(undefined),
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Charizard should not evolve').to.equal(0)
            ],
            'CHARMANDER': [
                item => expect(item.pastEvolutions, 'Charmander should not have past evolution').to.equal(undefined),
                item => expect(item.futureEvolutions, 'Charmander should have future evolutions').to.not.equal(undefined),
                item => expect(item.futureEvolutions.futureEvolutions, 'Charmander should have a future evolution').to.not.be.empty,
                item => expect(item.futureEvolutions.futureEvolutions[0].id, 'Charmander\'s first futureEvolution should be Charmeleon').to.equal('CHARMELEON'),
                item => expect(item.futureEvolutions.futureEvolutions[0].futureEvolutions, 'Charmander should have two future evolutions').to.not.be.empty,
                item => expect(item.futureEvolutions.futureEvolutions[0].futureEvolutions[0].id, 'Charmander\'s second futureEvolution should be Charizard').to.equal('CHARIZARD')
            ],
            'TYROGUE': [
                item => expect(item.nextEvolutionBranches.length, 'should have 3 nextEvolutionBranches for Tyrogue').to.equal(3),
                item => expect(item.pastEvolutions, 'Tyrogue should not have past evolutions').to.equal(undefined),
                item => expect(item.futureEvolutions, 'Tyrogue should have future evolutions defined').to.not.equal(undefined),
                item => expect(item.futureEvolutions.futureEvolutions, 'Tyrogue should have future evolutions').to.not.be.empty,
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Tyrogue should have 3 evolutions').to.equal(3),
                item => expect(item.futureEvolutions.futureEvolutions[0].futureEvolutions.length, 'Tyrogue\'s future evolutions should not evolve').to.equal(0),
                item => expect(item.dex, 'Tyrogue\'s dex number should be correct').to.equal(236)
            ],
            'HITMONLEE': [
                item => expect(item.pastEvolutions, 'Hitmonlee should have past evolution').to.not.be.empty,
                item => expect(item.pastEvolutions.length, 'Hitmonlee should only have one pastEvolution').to.equal(1),
                item => expect(item.pastEvolutions[0].id, 'Hitmonlee\'s only pastEvolution should be Tyrogue').to.equal('TYROGUE'),
                item => expect(item.futureEvolutions, 'Hitmonlee should have a defined future evolution tree').to.not.equal(undefined),
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Hitmonlee should not evolve').to.equal(0)
            ],
            'HITMONTOP': [
                item => expect(item.pastEvolutions, 'Hitmontop should have past evolution').to.not.be.empty,
                item => expect(item.pastEvolutions.length, 'Hitmontop should only have one pastEvolution').to.equal(1),
                item => expect(item.pastEvolutions[0].id, 'Hitmontop\'s only pastEvolution should be Tyrogue').to.equal('TYROGUE'),
                item => expect(item.futureEvolutions, 'Hitmontop should have a defined future evolution tree').to.not.equal(undefined),
                item => expect(item.futureEvolutions.futureEvolutions.length, 'Hitmontop should not evolve').to.equal(0)
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
                expect(pokemon.encounter.gender.femalePercent, `pokemon.encounter.gender.femalePercent ${pokemon.id}`).not.to.equal(undefined);
                expect(pokemon.encounter.gender.malePercent, `pokemon.encounter.gender.malePercent ${pokemon.id}`).not.to.equal(undefined);
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
