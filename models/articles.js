const connection = require('../db/connection');

exports.sendArticles = () => {
  return connection
    .select('articles.author', 'title', 'articles.article_id', 'topic', 'articles.created_at', 'articles.votes', 'comment_count')
    .from('articles')
    .join('comments', 'comments.article_id', '=', 'articles.article_id')
    .groupBy('articles.article_id')
    .count('comments.article_id AS comment_count')
    .returning('*');
};
