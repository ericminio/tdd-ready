let { Promise } = require('yop-promises');

module.exports = {
    apiReturning: (data)=> ()=>{
        let promise = new Promise();
        setTimeout(()=>{
            promise.resolve({
                ok:true,
                json:()=>{
                    let p = new Promise();
                    setTimeout(()=>{
                        p.resolve(data);
                    }, 50);
                    return p;
                }
            });
        }, 100);
        return promise;
    },
    apiFailingWithError: (message)=> ()=> {
        let promise = new Promise();
        setTimeout(()=>{
            promise.reject(message);
        }, 100);
        return promise;
    }
}
