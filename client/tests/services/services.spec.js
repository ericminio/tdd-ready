import { expect } from 'chai';
import { fetchMessage } from '../../src/services';
let stringify = require('../support/stringify.api');

describe('Services', () => {

    it('exposes fetchMessage async function', () => {
        expect(stringify(fetchMessage)).to.contain("new Promise");
    });
})
