const connection = require('../db/connection');

exports.sendArticles = (
  { sort_by = 'articles.created_at', order = 'desc', ...remainingQueries },
  param
) => { 
  sort_by = sort_by === 'votes' ? `articles.${sort_by}` : sort_by
  console.log(sort_by , 'THIS IS THE SORT BY FOR VOTES')
  return connection
    .select(
      'articles.author',
      'title',
      'articles.article_id',
      'articles.body',
      'topic',
      'articles.created_at',
      'articles.votes'
    )
    .from('articles')
    .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
    .groupBy('articles.article_id')
    .count('comments.article_id as comment_count')
    .where(builder => {
      if (remainingQueries.author)
        builder.where('articles.author', remainingQueries.author);
      if (remainingQueries.topic)
        builder.where('articles.topic', remainingQueries.topic);
      if (param) builder.where('articles.article_id', param);
    })
    .orderBy(sort_by, order)
    .returning('*');
};

exports.fetchUpdatedArticle = (id, increment) => {
  return connection
    .select('*')
    .from('articles')
    .where(id)
    .increment('votes', increment)
    .returning('*');
};

exports.deleteArticle = id => {
  return connection
    .select('*')
    .from('articles')
    .where(id)
    .del()
    .returning('*');
};
