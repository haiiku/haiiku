'use strict';

const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();
const response = require('../response');
const comment = require('../model/comment');

module.exports.dynamo = dynamo;

module.exports.get = (event, context, callback) => {
  // dynamo db query params
  const params = {
    TableName: process.env.TABLE_NAME,
    IndexName: process.env.POST_INDEX_NAME,
    ConsistentRead: false,
    KeyConditionExpression: '#sid = :sid and #aid = :aid',
    ExpressionAttributeNames: {
      '#sid': 'site_id',
      '#aid': 'post_id',
    },
    ExpressionAttributeValues: {
      ':sid': process.env.SITE_ID,
      ':aid': event.pathParameters.post_id,
    },
    Limit: process.env.QUERY_LIMIT,
  };

  // dynamo db query
  dynamo.query(params, (error, data) => {
    return error
      ? response.fail(callback, 500)
      : response.success(callback, 200, JSON.stringify({data: data.Items}));
  });
};

module.exports.put = (event, context, callback) => {
  // document
  const body = JSON.parse(event.body);

  // dynamo db put params
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: comment.new(process.env.SITE_ID, event.pathParameters.post_id, body.author, body.text),
  };

  // dynamo db put
  dynamo.put(params, (error) => {
    return error
      ? response.fail(callback, 500)
      : response.success(callback, 201);
  });
};
