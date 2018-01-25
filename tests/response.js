'use strict';

const chai = require('chai');
const response = require('./../src/response');

const { assert } = chai;

describe('response', () => {
  describe('fail', () => {
    it('should return an error object', (done) => {
      response.fail((err) => {
        assert.typeOf(err, 'object');

        done();
      }, 500);
    });

    it('should not return data', (done) => {
      response.fail((err, data) => {
        assert.typeOf(data, 'null');

        done();
      }, 500);
    });

    it('should include status code in error object', (done) => {
      response.fail((err) => {
        assert.property(err, 'statusCode');

        done();
      }, 500);
    });

    it('should have the right status code', (done) => {
      response.fail((err) => {
        assert.equal(err.statusCode, 500);

        done();
      }, 500);
    });

    it('should include headers in error object', (done) => {
      response.fail((err) => {
        assert.property(err, 'headers');

        done();
      }, 500);
    });

    it('should include Access-Control-Allow-Origin in error object headers', (done) => {
      response.fail((err) => {
        assert.property(err.headers, 'Access-Control-Allow-Origin');

        done();
      }, 500);
    });
  });

  describe('success', () => {
    describe('without body', () => {
      it('should not return an error', (done) => {
        response.success((err) => {
          assert.typeOf(err, 'null');

          done();
        }, 200);
      });

      it('should return a data object', (done) => {
        response.success((err, data) => {
          assert.typeOf(data, 'object');

          done();
        }, 200);
      });

      it('should include status code in data object', (done) => {
        response.success((err, data) => {
          assert.property(data, 'statusCode');

          done();
        }, 200);
      });

      it('should have the right status code', (done) => {
        response.success((err, data) => {
          assert.equal(data.statusCode, 200);

          done();
        }, 200);
      });

      it('should include headers in data object', (done) => {
        response.success((err, data) => {
          assert.property(data, 'headers');

          done();
        }, 200);
      });

      it('should include Access-Control-Allow-Origin in data object headers', (done) => {
        response.success((err, data) => {
          assert.property(data.headers, 'Access-Control-Allow-Origin');

          done();
        }, 200);
      });

      it('should not include body in data object', (done) => {
        response.success((err, data) => {
          assert.notProperty(data, 'body');

          done();
        }, 200);
      });
    });

    describe('with body', () => {
      it('should not return an error', (done) => {
        response.success((err) => {
          assert.typeOf(err, 'null');

          done();
        }, 200, { foo: 'bar' });
      });

      it('should return a data object', (done) => {
        response.success((err, data) => {
          assert.typeOf(data, 'object');

          done();
        }, 200, { foo: 'bar' });
      });

      it('should include status code in data object', (done) => {
        response.success((err, data) => {
          assert.property(data, 'statusCode');

          done();
        }, 200, { foo: 'bar' });
      });

      it('should have the right status code', (done) => {
        response.success((err, data) => {
          assert.equal(data.statusCode, 200);

          done();
        }, 200, { foo: 'bar' });
      });

      it('should include headers in data object', (done) => {
        response.success((err, data) => {
          assert.property(data, 'headers');

          done();
        }, 200, { foo: 'bar' });
      });

      it('should include Access-Control-Allow-Origin in data object headers', (done) => {
        response.success((err, data) => {
          assert.property(data.headers, 'Access-Control-Allow-Origin');

          done();
        }, 200, { foo: 'bar' });
      });

      it('should include body in data object', (done) => {
        response.success((err, data) => {
          assert.property(data, 'body');

          done();
        }, 200, { foo: 'bar' });
      });
    });
  });
});
