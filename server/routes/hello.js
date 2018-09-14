let { execute } = require('yop-postgresql');

module.exports = (req, res) => {
    execute('select content from message', [], (rows, error)=>{
        if (error) {
            res.send({ error:error });
        }
        res.send({ message:rows[0] });
    });
};
