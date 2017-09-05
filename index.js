var mongoose = require('mongoose');
var morgan = require('morgan');
var stream = require('stream')
var carrier = require('carrier')

var PassThroughStream = stream.PassThrough

// Schema
var logSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    log: String
});

/*
 * mongoData : object
 * options : object
 * format : string, default is combined, optional argument
 */
function MongooseMorgan(mongoData, options, format) {
    // Filter the argurments
    var args = Array.prototype.slice.call(arguments);

    if (args.length == 0 || !mongoData.connectionString) {
        throw new Error('Mongo connection string is null or empty.');
    }

    if (args.length > 1 && typeof options !== 'object') {
        throw new Error('Options parameter needs to be an object.');
    }

    if (args.length > 2 && typeof format === 'object') {
        throw new Error('Format parameter should be a string.');
    }

    options = options || {};
    format = format || 'combined';

    // Create connection to MongoDb
    var collection = mongoData.collection || 'logs';
    var user = mongoData.user || null;
    var pass = mongoData.pass || null;
    mongoose.connect(mongoData.connectionString, {
        user: user,
        pass: pass
    });

    // Create stream for morgan to write
    var stream = new PassThroughStream();
    // Create stream to read from
    var lineStream = carrier.carry(stream);
    lineStream.on('line', onLine);

    // Morgan options stream
    options.stream = stream;

    // Create mongoose model
    var Log = mongoose.model('Log', logSchema, collection);

    function onLine(line) {
        var logModel = new Log();
        logModel.log = line;

        logModel.save(function (err) {
            if (err) {
                throw err;
            }
        });
    }
    return morgan(format, options);
}

module.exports = MongooseMorgan;