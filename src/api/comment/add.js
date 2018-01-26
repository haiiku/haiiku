'use strict';

const AWS = require('aws-sdk');
const response = require('../../response');
const comment = require('../../model/comment');

const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.dynamo = dynamo;

module.exports.handle = (event, context, callback) => {
  // check env
  if (!process.env.SITE_ID || !process.env.TABLE_NAME) {
    return response.fail(callback, 500);
  }

  // check event
  if (!event.body || !event.pathParameters) {
    return response.fail(callback, 500);
  }

  // get event body as object
  const body = JSON.parse(event.body);

  // prepare dynamo db item
  if (!event.pathParameters.post_id || !body.author || !body.text) {
    return response.fail(callback, 500);
  }

  const siteId = process.env.SITE_ID;
  const postId = event.pathParameters.post_id;
  const { author, text } = body;

  const item = comment.new(siteId, postId, author, text);

  // prepare dynamo db params
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: item,
  };

  // put dynamo db item
  return dynamo.put(params, (error) => {
    if (error) {
      return response.fail(callback, 500);
    }

    return response.success(callback, 201);
  });
};
