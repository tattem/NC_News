const connection = require('../db/connection');

exports.sendComments = ({ sort_by = 'created_at', order = 'desc' }, id) => {
  return connection
    .select('*')
    .from('comments')
    .where(id)
    .orderBy(sort_by, order);
};

exports.postComments = (id, params) => {
  return connection('comments')
    .insert({ article_id: id, body: params.body, author: params.username })
    .into('comments')
    .returning('*');
};

exports.deleteComment = id => {
  return connection
    .select('*')
    .from('comments')
    .where(id)
    .del();
};

exports.updateVotes = (id, increment) => {
  return connection
    .select('*')
    .from('comments')
    .where(id)
    .increment('votes', increment)
    .returning('*');
};
