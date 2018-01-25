'use strict';

const chai = require('chai');
const model = require('./../../src/model/comment');

const { assert } = chai;

describe('modelComment', () => {
  describe('everything is good', () => {
    const data = model.new('testSiteId', 'testPostId', 'testAuthor', 'testText');

    it('should include the site_id in the returned object', () => {
      assert.property(data, 'site_id');
      assert.equal(data.site_id, 'testSiteId');
    });

    it('should include the post_id in the returned object', () => {
      assert.property(data, 'post_id');
      assert.equal(data.post_id, 'testPostId');
    });

    it('should include the comment in the returned object', () => {
      assert.property(data, 'comment');
      assert.typeOf(data.comment, 'object');
    });

    it('should include the author in the comment object', () => {
      assert.property(data.comment, 'author');
      assert.equal(data.comment.author, 'testAuthor');
    });

    it('should include the text in the comment object', () => {
      assert.property(data.comment, 'text');
      assert.equal(data.comment.text, 'testText');
    });

    it('should include the created_at in the returned object', () => {
      assert.property(data, 'created_at');
      assert.typeOf(data.created_at, 'number');
    });

    it('should include the updated_at in the returned object', () => {
      assert.property(data, 'updated_at');
      assert.typeOf(data.updated_at, 'number');
    });
  });
});
