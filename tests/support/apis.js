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
    apiFailingWithError: (code, text)=> ()=> {
        let promise = new Promise();
        setTimeout(()=>{
            promise.resolve({
                ok: false,
                status: code,
                statusText: text
            });
        }, 100);
        return promise;
    }
}
