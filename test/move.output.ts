import { Move } from '../src/components/move/move.model';
import { expect } from 'chai';

describe('Move Output', () => {
    let input: Move[];
    beforeEach(() => {
        input = require('../output/move.json');
    });

    it('should have items', () => {
        expect(input.length).to.not.equal(0);
    });

    it('should have values', () => {
        const testFunctions = [
            item => expect(item.accuracyChange).to.not.equal(undefined),
            item => expect(item.animationId).to.not.equal(undefined),
            item => expect(typeof item.pokemonType).to.equal('object'),
            item => expect(item.pokemonType.id).to.not.equal(undefined),
            item => expect(item.pokemonType.name).to.not.equal(undefined),
            item => expect(item.trainerLevelMin).to.not.equal(undefined, 'trainerLevelMin'),
            item => expect(item.trainerLevelMax).to.not.equal(undefined),
            item => expect(item.vfxName).to.not.equal(undefined),
            item => expect(item.durationMs).to.not.equal(undefined),
            item => expect(item.damageWindowStartMs).to.not.equal(undefined),
            item => expect(item.damageWindowEndMs).to.not.equal(undefined),
            item => expect(item.id).to.not.equal(undefined),
            item => expect(item.name).to.not.equal(undefined),
        ];

        input.forEach(item => {
            testFunctions.forEach(func => {
                func(item);
            });
        });
    });
});