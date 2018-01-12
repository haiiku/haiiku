'use strict';

var OAuth = require('oauth').OAuth;

var oauth = new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.TWITTER_CONSUMER_KEY,
  process.env.TWITTER_CONSUMER_SECRET,
  '1.0',
  process.env.TWITTER_CALLBACK_URI,
  'HMAC-SHA1'
);

module.exports.requestToken = (event, context, callback) => {
  // get request token
  oauth.getOAuthRequestToken((error, oauth_token, oauth_token_secret, results) => {
    // fail
    if (error) {
      console.error(error);
      return callback(new Error('[500] Internal Server Error'));
    }

    // prepare payload
    var payload = {
      token: oauth_token,
      token_secret: oauth_token_secret,
      authenticate_url: 'https://twitter.com/oauth/authenticate?oauth_token=' + oauth_token,
    }

    // send response
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(payload)
    });
  });
};

module.exports.authToken = (event, context, callback) => {
  var token = event.token;
  var token_secret = event.token_secret;
  var verifier = event.verifier;

  // get auth token
  oauth.getOAuthAccessToken(token, token_secret, verifier, (error, access_token, access_token_secret, results) => {
    // fail
    if (error) {
      console.error(error);
      return callback(new Error('[500] Internal Server Error'));
    }

    // prepare payload
    var payload = {
      access_token: access_token,
      access_token_secret: access_token_secret
    };

    // send response
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(payload)
    });
  });
};
