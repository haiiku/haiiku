'use strict';

const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();
const response = require('../../response');

module.exports.dynamo = dynamo;

module.exports.handle = (event, context, callback) => {
  // check env
  if (!process.env.SITE_ID || !process.env.TABLE_NAME || !process.env.POST_INDEX_NAME) {
    return response.fail(callback, 500);
  }

  // check event
  if (!event.pathParameters || !event.pathParameters.post_id) {
    return response.fail(callback, 500);
  }

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
  return dynamo.query(params, (error, data) => {
    if (error) {
      return response.fail(callback, 500);
    }

    return response.success(callback, 200, JSON.stringify({
      data: data.Items,
    }));
  });
};
