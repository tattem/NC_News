const { sendArticles, fetchUpdatedArticle } = require('../models/articles');

exports.getArticles = (req, res, next) => {
  sendArticles(req.query).then(articles => {
    articles.forEach(article => delete article.body);
    res.status(200).json({ articles });
  });
};
exports.getArticle = (req, res, next) => {
  sendArticles(req.query, req.params.article_id).then(([article]) => {
    res.status(200).json({ article });
  });
};
exports.sendPatchUpdate = (req, res, next) => {
  fetchUpdatedArticle(req.params, req.body.inc_votes).then(([article]) => {
    res.status(201).json({article});
  });
};
