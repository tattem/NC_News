const connection = require('../db/connection');

exports.sendComments = (id) => {
  return connection
    .select('*')
    .from('comments')
    .where(id)
};
