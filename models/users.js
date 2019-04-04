const connection = require('../db/connection');

exports.sendUsers = (id) => {
  return connection
    .select('*')
    .from('users')
    .where(id)
    .returning('*');
};
