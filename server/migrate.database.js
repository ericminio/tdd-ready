let { execute } = require('yop-postgresql');
let fs = require('fs');

let now = function() {
    let migrations = [
        fs.readFileSync(__dirname + '/sql/1.create.table.message.sql').toString()
    ];
    execute(migrations, [], (rows, error)=>{
        console.log('sql migration errors:', error);
    });
}

module.exports = {
    now:now
};
