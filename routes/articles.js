const articlesRouter = require('express').Router();
const {
  getArticles,
  getArticle,
  sendPatchUpdate,
  sendDeletedArticle
} = require('../controllers/articles');
const { getArticleComments } = require('../controllers/comments');

articlesRouter.route('/').get(getArticles);
articlesRouter
  .route('/:article_id')
  .get(getArticle)
  .patch(sendPatchUpdate)
  .delete(sendDeletedArticle);

articlesRouter
  .route('/:article_id/comments')
  .get(getArticleComments);

module.exports = articlesRouter;
