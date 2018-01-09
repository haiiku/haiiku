'use strict';

var chai = require('chai');
var expect = chai.expect;
var handler = require('./../src/handler');

describe('Hello function', () => {
    it('should return a 200', () => {
        handler.hello({}, {}, (error, response) => {
            expect(response.statusCode).to.equal(200);
        });
    });
});
