'use strict';

const fs = require('fs');
const sinon = require('sinon');
const api = require('./../src/comments');

describe('get_comments', () => {
  const event = JSON.parse(fs.readFileSync('events/http-comments-get.json', 'utf8'));
  const context = {};

  it('should call query on dynamo', () => {
    const queryStub = sinon.stub(api.dynamo, 'query');
    queryStub.yields(null, {
      Items: [],
    });

    api.get(event, context, () => {
      sinon.assert.calledOnce(queryStub);
    });

    queryStub.restore();
  });
});

describe('put_comment', () => {
  const event = JSON.parse(fs.readFileSync('events/http-comments-put.json', 'utf8'));
  const context = {};

  it('should call put on dynamo', () => {
    const putStub = sinon.stub(api.dynamo, 'put');
    putStub.yields(null, {
      Items: [],
    });

    api.put(event, context, () => {
      sinon.assert.calledOnce(putStub);
    });

    putStub.restore();
  });
});
