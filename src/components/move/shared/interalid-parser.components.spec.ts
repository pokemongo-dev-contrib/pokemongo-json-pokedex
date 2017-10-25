import { InternalIdParser } from './internalid-parser.component';
import { expect } from 'chai';

describe('Class: InteralIdParser', () => {
    it('should parse the interalId from various ids', () => {
        const interalIdParser = new InternalIdParser();
        expect(interalIdParser.Process('V0013_MOVE_WRAP')).to.equal(13);
        expect(interalIdParser.Process('V0014_MOVE_HYPER_BEAM')).to.equal(14);
        expect(interalIdParser.Process('V0020_MOVE_VICE_GRIP')).to.equal(20);
    });
});