const express = require('express');
const path = require('path');
const {
    hello
} = require('./routes');

const app = express();
const port = process.env.PORT || 5000;

require('./migrate.database').now();

module.exports = {
    port: port,
    start: function(done) {
        app.get('*', (req, res, next)=>{
            res.set({
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Prama': 'no-cache',
                'Expires': 'Thu, 01 Jan 1970 00:00:00 GMT'
            });
            next();
        });
        app.get('/hello', hello);

        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(path.join(__dirname, '../client/build')));

            app.get('*', function(req, res) {
              res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
            });
        }

        app.listen(port, done);
    }
}
