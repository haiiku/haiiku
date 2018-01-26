'use strict';

const sinon = require('sinon');
const commentAdd = require('./../../../src/api/comment/add');
const response = require('./../../../src/response');
const comment = require('./../../../src/model/comment');

const { dynamo } = commentAdd;

describe('apiCommentAdd', () => {
  let dynamoPutStub;
  let responseSuccessStub;
  let responseFailStub;
  let commentNewStub;

  beforeEach(() => {
    commentNewStub = sinon.stub(comment, 'new');
    dynamoPutStub = sinon.stub(dynamo, 'put');
    responseSuccessStub = sinon.stub(response, 'success');
    responseFailStub = sinon.stub(response, 'fail');

    process.env.SITE_ID = 'site';
    process.env.TABLE_NAME = 'table';
  });

  afterEach(() => {
    commentNewStub.restore();
    dynamoPutStub.restore();
    responseSuccessStub.restore();
    responseFailStub.restore();

    delete process.env.SITE_ID;
    delete process.env.TABLE_NAME;
  });

  describe('bad env', () => {
    describe('missing SITE_ID', () => {
      const event = {
        body: JSON.stringify({
          author: 'foo',
          text: 'bar',
        }),
        pathParameters: {
          post_id: 'test',
        },
      };
      const context = {};

      it('should not create an item', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        delete process.env.SITE_ID;

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(commentNewStub, 0);

          done();
        });
      });

      it('should not put to dynamo db', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        delete process.env.SITE_ID;

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(dynamoPutStub, 0);

          done();
        });
      });

      it('should not respond with success', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        delete process.env.SITE_ID;

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(responseSuccessStub, 0);

          done();
        });
      });

      it('should respond with failure', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        delete process.env.SITE_ID;

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(responseFailStub, 1);

          done();
        });
      });
    });

    describe('missing TABLE_NAME', () => {
      const event = {
        body: JSON.stringify({
          author: 'foo',
          text: 'bar',
        }),
        pathParameters: {
          post_id: 'test',
        },
      };
      const context = {};

      it('should not create an item', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        delete process.env.TABLE_NAME;

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(commentNewStub, 0);

          done();
        });
      });

      it('should not put to dynamo db', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        delete process.env.TABLE_NAME;

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(dynamoPutStub, 0);

          done();
        });
      });

      it('should not respond with success', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        delete process.env.TABLE_NAME;

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(responseSuccessStub, 0);

          done();
        });
      });

      it('should respond with failure', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        delete process.env.TABLE_NAME;

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(responseFailStub, 1);

          done();
        });
      });
    });
  });

  describe('bad event', () => {
    describe('missing body', () => {
      const event = {
        pathParameters: {
          post_id: 'test',
        },
      };
      const context = {};

      it('should not create an item', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(commentNewStub, 0);

          done();
        });
      });

      it('should not put to dynamo db', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(dynamoPutStub, 0);

          done();
        });
      });

      it('should not respond with success', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(responseSuccessStub, 0);

          done();
        });
      });

      it('should respond with failure', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(responseFailStub, 1);

          done();
        });
      });
    });

    describe('missing author in body', () => {
      const event = {
        body: JSON.stringify({
          text: 'bar',
        }),
        pathParameters: {
          post_id: 'test',
        },
      };
      const context = {};

      it('should not create an item', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(commentNewStub, 0);

          done();
        });
      });

      it('should not put to dynamo db', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(dynamoPutStub, 0);

          done();
        });
      });

      it('should not respond with success', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(responseSuccessStub, 0);

          done();
        });
      });

      it('should respond with failure', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(responseFailStub, 1);

          done();
        });
      });
    });

    describe('missing text in body', () => {
      const event = {
        body: JSON.stringify({
          author: 'foo',
        }),
        pathParameters: {
          post_id: 'test',
        },
      };
      const context = {};

      it('should not create an item', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(commentNewStub, 0);

          done();
        });
      });

      it('should not put to dynamo db', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(dynamoPutStub, 0);

          done();
        });
      });

      it('should not respond with success', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(responseSuccessStub, 0);

          done();
        });
      });

      it('should respond with failure', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(responseFailStub, 1);

          done();
        });
      });
    });

    describe('missing path_parameters', () => {
      const event = {
        body: JSON.stringify({
          author: 'foo',
          text: 'bar',
        }),
      };
      const context = {};

      it('should not create an item', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(commentNewStub, 0);

          done();
        });
      });

      it('should not put to dynamo db', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(dynamoPutStub, 0);

          done();
        });
      });

      it('should not respond with success', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(responseSuccessStub, 0);

          done();
        });
      });

      it('should respond with failure', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(responseFailStub, 1);

          done();
        });
      });
    });

    describe('missing post_id in path_parameters', () => {
      const event = {
        body: JSON.stringify({
          author: 'foo',
          text: 'bar',
        }),
        pathParameters: {},
      };
      const context = {};

      it('should not create an item', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(commentNewStub, 0);

          done();
        });
      });

      it('should not put to dynamo db', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(dynamoPutStub, 0);

          done();
        });
      });

      it('should not respond with success', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(responseSuccessStub, 0);

          done();
        });
      });

      it('should respond with failure', (done) => {
        commentNewStub.returns({});
        dynamoPutStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentAdd.handle(event, context, () => {
          sinon.assert.callCount(responseFailStub, 1);

          done();
        });
      });
    });
  });

  describe('bad put', () => {
    const event = {
      body: JSON.stringify({
        author: 'foo',
        text: 'bar',
      }),
      pathParameters: {
        post_id: 'test',
      },
    };
    const context = {};

    it('should create an item', (done) => {
      commentNewStub.returns({});
      dynamoPutStub.yields({}, null);
      responseSuccessStub.yields(null, {});
      responseFailStub.yields({}, null);

      commentAdd.handle(event, context, () => {
        sinon.assert.callCount(commentNewStub, 1);

        done();
      });
    });

    it('should put to dynamo db', (done) => {
      commentNewStub.returns({});
      dynamoPutStub.yields({}, null);
      responseSuccessStub.yields(null, {});
      responseFailStub.yields({}, null);

      commentAdd.handle(event, context, () => {
        sinon.assert.callCount(dynamoPutStub, 1);

        done();
      });
    });

    it('should not respond with success', (done) => {
      commentNewStub.returns({});
      dynamoPutStub.yields({}, null);
      responseSuccessStub.yields(null, {});
      responseFailStub.yields({}, null);

      commentAdd.handle(event, context, () => {
        sinon.assert.callCount(responseSuccessStub, 0);

        done();
      });
    });

    it('should respond with failure', (done) => {
      commentNewStub.returns({});
      dynamoPutStub.yields({}, null);
      responseSuccessStub.yields(null, {});
      responseFailStub.yields({}, null);

      commentAdd.handle(event, context, () => {
        sinon.assert.callCount(responseFailStub, 1);

        done();
      });
    });
  });

  describe('everything is good', () => {
    const event = {
      body: JSON.stringify({
        author: 'foo',
        text: 'bar',
      }),
      pathParameters: {
        post_id: 'test',
      },
    };
    const context = {};

    it('should create an item', (done) => {
      commentNewStub.returns({});
      dynamoPutStub.yields(null, {});
      responseSuccessStub.yields(null, {});
      responseFailStub.yields({}, null);

      commentAdd.handle(event, context, () => {
        sinon.assert.callCount(commentNewStub, 1);

        done();
      });
    });

    it('should put to dynamo db', (done) => {
      commentNewStub.returns({});
      dynamoPutStub.yields(null, {});
      responseSuccessStub.yields(null, {});
      responseFailStub.yields({}, null);

      commentAdd.handle(event, context, () => {
        sinon.assert.callCount(dynamoPutStub, 1);

        done();
      });
    });

    it('should respond with success', (done) => {
      commentNewStub.returns({});
      dynamoPutStub.yields(null, {});
      responseSuccessStub.yields(null, {});
      responseFailStub.yields({}, null);

      commentAdd.handle(event, context, () => {
        sinon.assert.callCount(responseSuccessStub, 1);

        done();
      });
    });

    it('should not respond with failure', (done) => {
      commentNewStub.returns({});
      dynamoPutStub.yields(null, {});
      responseSuccessStub.yields(null, {});
      responseFailStub.yields({}, null);

      commentAdd.handle(event, context, () => {
        sinon.assert.callCount(responseFailStub, 0);

        done();
      });
    });
  });
});
