const connection = require('../db/connection');

exports.sendComments = ({ sort_by = 'created_at', order = 'desc' }, id) => {
  return connection
    .select('*')
    .from('comments')
    .where(id)
    .orderBy(sort_by, order);
};
