'use strict';

module.exports.new = (siteId, postId, author, text) => {
  const timestamp = new Date().getTime();

  return {
    site_id: siteId,
    post_id: postId,
    comment: {
      author,
      text,
    },
    created_at: timestamp,
    updated_at: timestamp,
  };
};
