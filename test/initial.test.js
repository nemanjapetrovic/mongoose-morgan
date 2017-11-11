// Global packages
var expect = require('chai').expect;
var assert = require('chai').assert;

// Local packages
var mongooseMorgan = require('./../index');

describe('Arguments test', function () {
    it('empty call', function () {
        assert.throws(() => mongooseMorgan(), Error,
            'Mongo connection string is null or empty. Try by adding this: { connectionString : \'{mongo_url}\'}');
    });

    it('call with mongo and format args but without options arg', function () {
        assert.throws(() => mongooseMorgan({
            connectionString: 'mongodb://localhost:27017/logs-db'
        }, 'dev'), Error, 'Options parameter needs to be an object. You can specify empty object like {}.');
    });

    it('call with format arg as object', function () {
        assert.throws(() => mongooseMorgan({
            connectionString: 'mongodb://localhost:27017/logs-db'
        }, {}, {
            format: 'dev'
        }), Error, 'Format parameter should be a string. Default parameter is \'combined\'.');
    });
});