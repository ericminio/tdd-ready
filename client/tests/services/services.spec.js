import { expect } from 'chai';
import {
    fetchMessage
} from '../../src/services';

describe('Services', ()=>{

    it('exposes fetchMessage', ()=>{        
        expect(fetchMessage).not.to.equal(null);
    });
})
