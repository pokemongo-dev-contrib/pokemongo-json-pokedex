import { expect } from 'chai';
import { CPCalculator } from './cp-calculator';

describe('Class: CPCalculator', () => {
    it('should output the correct for Bayleef', () => {
        // Source: http://www.imore.com/pokemon-go-gen-2
        let cp: number;
        cp = CPCalculator.Calculate(120, 122, 155);
        expect(cp).to.equal(1296);

    });

    it('should output the correct values for Meganium', () => {
        // source: https://rankedboost.com/pokemon-go/generation-2-tier-list/
        let cp: number;
        cp = CPCalculator.Calculate(160, 168, 202);
        expect(cp).to.equal(2227);
    });
});