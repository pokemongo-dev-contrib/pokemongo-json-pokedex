import { Item } from '@outcome/item';
import { expect } from 'chai';
import { uniqBy } from 'lodash';

describe('Item Output', () => {
    let input: Item[];
    beforeEach(() => {
        input = require('../output/item.json');
    });

    it('should have items', () => {
        expect(input.length).to.not.equal(0);
    });

    it('should have unique id', () => {
        expect(uniqBy(input, 'id').length).to.equal(input.length)
    });

    it('should have values', () => {
        const testFunctions = [
            item => expect(item.id).to.not.equal(undefined, 'id'),
            item => expect(item.name).to.not.equal(undefined, `name ${item.id}`),
            item => expect(item.dropTrainerLevel).to.not.equal(undefined, `dropTrainerLevel ${item.id}`),
            item => expect(item.itemType.name).to.not.equal(undefined, `itemType.name ${item.id}`),
            item => expect(item.itemType.id).to.not.equal(undefined, `itemType.id ${item.id}`),
            item => expect(item.category.name).to.not.equal(undefined, `category.name ${item.id}`),
            item => expect(item.category.id).to.not.equal(undefined, `category.id ${item.id}`),
        ];

        input.forEach(item => {
            testFunctions.forEach(func => {
                func(item);
            });
        });
    });
});
