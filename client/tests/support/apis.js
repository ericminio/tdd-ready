import { Promise } from 'yop-promises';

module.exports = {
    apiReturning: (data)=> ()=>{
        var promise = new Promise();
        setTimeout(()=>{
            promise.resolve(data);
        }, 100);
        return promise;
    },
    apiFailingWithError: (message)=> ()=> {
        var promise = new Promise();
        setTimeout(()=>{
            promise.reject(message);
        }, 100);
        return promise;
    }
}
