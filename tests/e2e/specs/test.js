const { exec } = require('child_process');

let server;
module.exports = {

    before: ()=> {
        if (! process.env.SERVER_IS_RUNNING) {
            console.log('starting api server...')
            server = exec("python -c 'from api import server; server.app.run(port=8082)'")
        }
    },
    after: ()=> {
        if (server) {
            console.log('stopping api server...')
            server.kill('SIGKILL')
        }
    },
    'default e2e tests': browser => {
        browser
            .url(process.env.VUE_DEV_SERVER_URL)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('.hello')
            .assert.containsText('#title', 'Hello Vue')
            .assert.elementCount('img', 1)
            .end()
    }
}
