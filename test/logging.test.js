/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const request = require('supertest');

describe('Express server test', () => {
  let server;

  beforeEach(() => {
    server = require('./server')();
  });

  afterEach((done) => {
    server.close(done);
  });

  it('200 responds to /ok', (done) => {
    request(server)
      .get('/ok')
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        done();
      });
  });

  it('404 everything else', (done) => {
    request(server)
      .get('/notfound')
      .expect(404)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        done();
      });
  });

  it('500 error', (done) => {
    request(server)
      .get('/error')
      .expect(500)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        done();
      });
  });
});
