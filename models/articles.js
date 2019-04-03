const connection = require('../db/connection');

exports.sendArticles = ({sort_by = 'articles.created_at', order = 'desc', ...remainingQueries}) => {
  console.log(remainingQueries, '<<<< rem q')
  return connection
    .select('articles.author', 'title', 'articles.article_id', 'topic', 'articles.created_at', 'articles.votes')
    .from('articles')
    .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
    .groupBy('articles.article_id')
    .count('comments.article_id as comment_count')
    .where((builder) => {
      if (remainingQueries.author) builder.where('articles.author',remainingQueries.author)
    })
    .orderBy(sort_by, order)
    .returning('*');
};
