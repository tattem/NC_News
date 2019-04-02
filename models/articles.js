const connection = require('../db/connection');

exports.sendArticles = () => {
    return connection.select('*').from('articles').returning('*')
}