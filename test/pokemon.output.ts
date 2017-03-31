import { Pokemon } from '../src/components/pokemon';
import { Move } from '../src/components/move';
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
            item => expect(Array.isArray(item.cinematicMoves)).to.equal(true, 'cinematicMoves type'),
            item => expect(item.cinematicMoves.length).to.not.equal(0, 'cinematicMoves length'),
            item => expect(Array.isArray(item.quickMoves)).to.equal(true, 'quickMoves array'),
            item => expect(item.quickMoves.length).to.not.equal(0, 'quickMoves length'),
            item => expect(item.evelutionPips).to.not.equal(undefined, 'evolutionPips'),
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
            item => item.id !== 'BULBASAUR' ? true : expect(item.nextEvolutionBranches.length === 1).to.equal(true, 'should have one nextEvolutionBranch for linear pokemon'),
            item => item.id !== 'EEVEE' ? true : expect(item.nextEvolutionBranches.length === 5).to.equal(true, 'should have 5 nextEvolutionBranches for Eevee'),
        ];

        input.forEach(item => {
            testFunctions.forEach(func => {
                func(item);
            });
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