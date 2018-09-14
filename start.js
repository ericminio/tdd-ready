let server = require('./server/server');
server.start(()=>{
    console.log('Listening on port', server.port);
});
