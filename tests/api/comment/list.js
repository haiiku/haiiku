'use strict';

const sinon = require('sinon');
const commentList = require('./../../../src/api/comment/list');
const response = require('./../../../src/response');

const { dynamo } = commentList;

describe('apiCommentList', () => {
  let dynamoQueryStub;
  let responseSuccessStub;
  let responseFailStub;

  beforeEach(() => {
    dynamoQueryStub = sinon.stub(dynamo, 'query');
    responseSuccessStub = sinon.stub(response, 'success');
    responseFailStub = sinon.stub(response, 'fail');

    process.env.SITE_ID = 'site';
    process.env.TABLE_NAME = 'table';
    process.env.POST_INDEX_NAME = 'post_index';
  });

  afterEach(() => {
    dynamoQueryStub.restore();
    responseSuccessStub.restore();
    responseFailStub.restore();

    delete process.env.SITE_ID;
    delete process.env.TABLE_NAME;
    delete process.env.POST_INDEX_NAME;
  });

  describe('bad env', () => {
    describe('missing SITE_ID', () => {
      const event = {
        pathParameters: {
          post_id: 'test',
        },
      };
      const context = {};

      it('should not query dynamo db', (done) => {
        dynamoQueryStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        delete process.env.SITE_ID;

        commentList.handle(event, context, () => {
          sinon.assert.callCount(dynamoQueryStub, 0);

          done();
        });
      });

      it('should not respond with success', (done) => {
        dynamoQueryStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        delete process.env.SITE_ID;

        commentList.handle(event, context, () => {
          sinon.assert.callCount(responseSuccessStub, 0);

          done();
        });
      });

      it('should respond with failure', (done) => {
        dynamoQueryStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        delete process.env.SITE_ID;

        commentList.handle(event, context, () => {
          sinon.assert.callCount(responseFailStub, 1);

          done();
        });
      });
    });

    describe('missing TABLE_NAME', () => {
      const event = {
        pathParameters: {
          post_id: 'test',
        },
      };
      const context = {};

      it('should not query dynamo db', (done) => {
        dynamoQueryStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        delete process.env.TABLE_NAME;

        commentList.handle(event, context, () => {
          sinon.assert.callCount(dynamoQueryStub, 0);

          done();
        });
      });

      it('should not respond with success', (done) => {
        dynamoQueryStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        delete process.env.TABLE_NAME;

        commentList.handle(event, context, () => {
          sinon.assert.callCount(responseSuccessStub, 0);

          done();
        });
      });

      it('should respond with failure', (done) => {
        dynamoQueryStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        delete process.env.TABLE_NAME;

        commentList.handle(event, context, () => {
          sinon.assert.callCount(responseFailStub, 1);

          done();
        });
      });
    });

    describe('missing POST_INDEX_NAME', () => {
      const event = {
        pathParameters: {
          post_id: 'test',
        },
      };
      const context = {};

      it('should not query dynamo db', (done) => {
        dynamoQueryStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        delete process.env.POST_INDEX_NAME;

        commentList.handle(event, context, () => {
          sinon.assert.callCount(dynamoQueryStub, 0);

          done();
        });
      });

      it('should not respond with success', (done) => {
        dynamoQueryStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        delete process.env.POST_INDEX_NAME;

        commentList.handle(event, context, () => {
          sinon.assert.callCount(responseSuccessStub, 0);

          done();
        });
      });

      it('should respond with failure', (done) => {
        dynamoQueryStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        delete process.env.POST_INDEX_NAME;

        commentList.handle(event, context, () => {
          sinon.assert.callCount(responseFailStub, 1);

          done();
        });
      });
    });
  });

  describe('bad event', () => {
    describe('missing path_parameters', () => {
      const event = {};
      const context = {};

      it('should not query dynamo db', (done) => {
        dynamoQueryStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentList.handle(event, context, () => {
          sinon.assert.callCount(dynamoQueryStub, 0);

          done();
        });
      });

      it('should not respond with success', (done) => {
        dynamoQueryStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentList.handle(event, context, () => {
          sinon.assert.callCount(responseSuccessStub, 0);

          done();
        });
      });

      it('should respond with failure', (done) => {
        dynamoQueryStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentList.handle(event, context, () => {
          sinon.assert.callCount(responseFailStub, 1);

          done();
        });
      });
    });

    describe('missing post_id in path_parameters', () => {
      const event = {
        pathParameters: {},
      };
      const context = {};

      it('should not query dynamo db', (done) => {
        dynamoQueryStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentList.handle(event, context, () => {
          sinon.assert.callCount(dynamoQueryStub, 0);

          done();
        });
      });

      it('should not respond with success', (done) => {
        dynamoQueryStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentList.handle(event, context, () => {
          sinon.assert.callCount(responseSuccessStub, 0);

          done();
        });
      });

      it('should respond with failure', (done) => {
        dynamoQueryStub.yields(null, {});
        responseSuccessStub.yields(null, {});
        responseFailStub.yields({}, null);

        commentList.handle(event, context, () => {
          sinon.assert.callCount(responseFailStub, 1);

          done();
        });
      });
    });
  });

  describe('bad query', () => {
    const event = {
      pathParameters: {
        post_id: 'test',
      },
    };
    const context = {};

    it('should query dynamo db', (done) => {
      dynamoQueryStub.yields({}, null);
      responseSuccessStub.yields(null, {});
      responseFailStub.yields({}, null);

      commentList.handle(event, context, () => {
        sinon.assert.callCount(dynamoQueryStub, 1);

        done();
      });
    });

    it('should not respond with success', (done) => {
      dynamoQueryStub.yields({}, null);
      responseSuccessStub.yields(null, {});
      responseFailStub.yields({}, null);

      commentList.handle(event, context, () => {
        sinon.assert.callCount(responseSuccessStub, 0);

        done();
      });
    });

    it('should respond with failure', (done) => {
      dynamoQueryStub.yields({}, null);
      responseSuccessStub.yields(null, {});
      responseFailStub.yields({}, null);

      commentList.handle(event, context, () => {
        sinon.assert.callCount(responseFailStub, 1);

        done();
      });
    });
  });

  describe('everything is good', () => {
    const event = {
      pathParameters: {
        post_id: 'test',
      },
    };
    const context = {};

    it('should query dynamo db', (done) => {
      dynamoQueryStub.yields(null, {});
      responseSuccessStub.yields(null, {});
      responseFailStub.yields({}, null);

      commentList.handle(event, context, () => {
        sinon.assert.callCount(dynamoQueryStub, 1);

        done();
      });
    });

    it('should respond with success', (done) => {
      dynamoQueryStub.yields(null, {});
      responseSuccessStub.yields(null, {});
      responseFailStub.yields({}, null);

      commentList.handle(event, context, () => {
        sinon.assert.callCount(responseSuccessStub, 1);

        done();
      });
    });

    it('should not respond with failure', (done) => {
      dynamoQueryStub.yields(null, {});
      responseSuccessStub.yields(null, {});
      responseFailStub.yields({}, null);

      commentList.handle(event, context, () => {
        sinon.assert.callCount(responseFailStub, 0);

        done();
      });
    });
  });
});
