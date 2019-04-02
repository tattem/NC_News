const connection = require('../db/connection');

exports.sendArticles = ({sort_by = 'articles.created_at', order = 'desc', ...remainingQueries}) => {
  return connection
    .select('articles.author', 'title', 'articles.article_id', 'topic', 'articles.created_at', 'articles.votes')
    .from('articles')
    .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
    .groupBy('articles.article_id')
    .count('comments.article_id as comment_count')
    .orderBy(sort_by, order)
    .returning('*');
};
