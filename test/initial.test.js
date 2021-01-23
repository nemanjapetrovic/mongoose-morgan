/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const assert = require('chai').assert;

const mongooseMorgan = require('./../index');

describe('Arguments test', () => {
  it('empty call', () => {
    assert.throws(() => mongooseMorgan(), Error,
      'Mongo connection string is null or empty. Try by adding this: { connectionString : \'{mongo_url}\'}');
  });

  it('call with mongo and format args but without options arg', () => {
    assert.throws(() => mongooseMorgan({
      connectionString: 'mongodb://localhost:27017/logs-db'
    }, 'dev'), Error, 'Options parameter needs to be an object. You can specify empty object like {}.');
  });

  it('call with format arg as object', () => {
    assert.throws(() => mongooseMorgan({
      connectionString: 'mongodb://localhost:27017/logs-db'
    }, {}, {
      format: 'dev'
    }), Error, 'Format parameter should be a string. Default parameter is \'combined\'.');
  });
});
