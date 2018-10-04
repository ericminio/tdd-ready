const { exec } = require('child_process');

let server;
module.exports = {

    before: ()=> {
        console.log('starting server...')
        server = exec("python -c 'import api; api.app.run(port=8082)'")
    },
    after: ()=> {
        console.log('stopping server...')
        server.kill('SIGKILL')
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
