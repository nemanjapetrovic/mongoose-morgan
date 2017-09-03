var mongoose = require('mongoose');

var logSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    log: String,
    additionalData: {}
});

module.exports = mongoose.model('Log', logSchema);