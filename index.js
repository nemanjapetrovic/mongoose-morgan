var mongoose = require('mongoose');
var morgan = require('morgan');
var stream = require('stream')
var carrier = require('carrier')

var PassThroughStream = stream.PassThrough

/**
 * MongooseMorgan object
 * @param  {object} mongoData - represents mongo database data, requires { connectionString : '{MONGO_URL}' } parameter.
 * @param  {object} options - represents morgan options, check their github, default value is empty object {}.
 * @param  {string} format - represents morgan formatting, check their github, default value is 'combined'.
 */
function MongooseMorgan(mongoData, options, format) {
    // Filter the arguments
    var args = Array.prototype.slice.call(arguments);

    if (args.length == 0 || !mongoData.connectionString) {
        throw new Error('Mongo connection string is null or empty. Try by adding this: { connectionString : \'{mongo_url}\'}');
    }

    if (args.length > 1 && typeof options !== 'object') {
        throw new Error('Options parameter needs to be an object. You can specify empty object like {}.');
    }

    if (args.length > 2 && typeof format === 'object') {
        throw new Error('Format parameter should be a string. Default parameter is \'combined\'.');
    }

    options = options || {};
    format = format || 'combined';

    // Create connection to MongoDb
    var collection = mongoData.collection || 'logs';
    var user = mongoData.user || null;
    var pass = mongoData.pass || null;
    var capped = mongoData.capped;
    var cappedSize = (mongoData.cappedSize || 10000000);
    var cappedMax = mongoData.cappedMax;

    mongoose.connect(mongoData.connectionString, {
        user: user,
        pass: pass,
        useNewUrlParser: true
    });

    // Create stream for morgan to write
    var stream = new PassThroughStream();
    // Create stream to read from
    var lineStream = carrier.carry(stream);
    lineStream.on('line', onLine);

    // Morgan options stream
    options.stream = stream;

    // Schema
    var logSchema = mongoose.Schema({
        date: {
            type: Date,
            default: Date.now
        },
        log: String
    }, capped ? { capped: { size: cappedSize, max: cappedMax } } : {} );
    
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
