import { Type } from '@outcome/type';
import { expect } from 'chai';

describe('Type Output', () => {
    let input: Type[];
    beforeEach(() => {
        input = require('../output/type.json');
    });

    it('should have items', () => {
        expect(input.length).to.not.equal(0);
        expect(input.length).to.equal(18);
    });

    it('should have values', () => {
        const testFunctions = [
            item => expect(item.id).to.not.equal(undefined, 'id'),
            item => expect(item.name).to.not.equal(undefined, 'name'),
            item => expect(item.damage).to.not.equal(undefined, 'damage'),
            item => expect(item.damage.length).to.not.equal(0, 'damage length'),
            item => expect(item.damage.length).to.equal(18, 'damage length')
        ];

        input.forEach(item => {
            testFunctions.forEach(func => {
                func(item);
            });
        });
    });
});
