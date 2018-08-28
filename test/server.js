const express = require('express');
const app = express();

const mongooseMorgan = require('./../index');

function MakeServer() {
    app.get('/ok', (req, res) => {
        res.status(200);
        res.send('hello world');
    });

    app.get('/error', (req, res) => {
        res.status(500);
        res.send('error example');
    });

    // Logger
    app.use(mongooseMorgan({
        connectionString: 'mongodb://localhost:27017/MongooseMorganUnit'
    }, {}, 'short'));

    var server = app.listen(3000, () => {
        var port = server.address().port;
        console.log('New server running on port %s', port);
    });

    return server;
}

module.exports = MakeServer;