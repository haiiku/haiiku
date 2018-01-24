'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.put = (event, context, callback) => {
  // get timestamp
  const timestamp = new Date().getTime();

  // document
  const body = JSON.parse(event.body)
  const item = {
    site_id: process.env.SITE_ID,
    post_id: event.pathParameters.post_id,
    comment: {
      author: body.author,
      text: body.text,
    },
    created_at: timestamp,
    updated_at: timestamp,
  };

  // dynamo db put params
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: item,
  };

  // dynamo db put
  dynamo.put(params, (error) => {
    if (error) {
      console.error(error);
      return callback(new Error('[500] Internal Server Error'));
    }

    return callback(null, {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  });
};
