import { AvatarCustomization } from '@components/avatar-customization';
import { expect } from 'chai';

describe('AvatarCustomization Output', () => {
    let input: AvatarCustomization[];
    beforeEach(() => {
        input = require('../output/avatar-customization.json');
    });

    it('should have items', () => {
        expect(input.length).to.not.equal(0);
    });

    it('should have values', () => {
        const testFunctions = [
            item => item.id !== 'f_shirt_buttondown_0' && expect(item.enabled).to.not.equal(undefined, 'enabled'),
            item => expect(item.gender).to.not.equal(undefined, 'gender'),
            item => expect(item.slot).to.not.equal(undefined, 'slot'),
            item => expect(item.slot.length).to.not.equal(0, 'slot length'),
            item => expect(item.name).to.not.equal(undefined, 'name'),
            item => expect(item.id).to.not.equal(undefined, 'id'),
            item => expect(item.category).to.not.equal(undefined, 'category')
        ];

        input.forEach(item => {
            testFunctions.forEach(func => {
                func(item);
            });
        });
    });
});
