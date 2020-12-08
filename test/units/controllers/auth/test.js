import { expect } from 'chai';
describe('true or false', () => {

    it('expects true to equal true', () => {
        expect(true).to.eql(true);
    });

    it('expects false to equal false', () => {
        expect(false).to.eql(false);
    })
})