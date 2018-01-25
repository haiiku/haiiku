'use strict';

module.exports.success = (callback, statusCode, body) => {
  const response = {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  if (body) {
    response.body = body;
  }

  return callback(null, response);
};

module.exports.fail = (callback, statusCode) => {
  const response = {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  return callback(response, null);
};
