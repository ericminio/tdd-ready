import { expect } from 'chai';
import { fetchMessage } from '../../src/services';
import { stringify } from '../support/utils';

describe('Services', () => {

    it('exposes fetchMessage async function', () => {
        expect(stringify(fetchMessage)).to.contain("new Promise");
    });
})
