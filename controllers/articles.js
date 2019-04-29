const {
  sendArticles,
  fetchUpdatedArticle,
  deleteArticle
} = require('../models/articles');

exports.getArticles = (req, res, next) => {
  console.log(req.query)
  sendArticles(req.query)
    .then(articles => {
      const allowedQueries = [
        'article_id',
        'title',
        'body',
        'votes',
        'topic',
        'author',
        'created_at',
        'sort_by'
      ];
      let badQueryCount = 0;
      Object.keys(req.query).forEach(query => {
        if (!allowedQueries.includes(query)) {
          badQueryCount++;
        }
      });
      if (badQueryCount > 0) return Promise.reject({ status: 404 });
      res.status(200).json({ articles });
    })
    .catch(next);
};
exports.getArticle = (req, res, next) => {
  sendArticles(req.query, req.params.article_id)
    .then(([article]) => {
      if (!article) return Promise.reject({ status: 404 });
      res.status(200).json({ article });
    })
    .catch(next);
};
exports.sendPatchUpdate = (req, res, next) => {
  fetchUpdatedArticle(req.params, req.body.inc_votes)
    .then(([article]) => {
      if (!article) return Promise.reject({ status: 404 });
      res.status(201).json({ article });
    })
    .catch(next);
};
exports.sendDeletedArticle = (req, res, next) => {
  deleteArticle(req.params)
    .then(deleted => {
      if (deleted.length === 0) return Promise.reject({ status: 404 });
      res.status(204).send();
    })
    .catch(next);
};
