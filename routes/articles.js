const articlesRouter = require('express').Router();
const {
  getArticles,
  getArticle,
  sendPatchUpdate,
  sendDeletedArticle
} = require('../controllers/articles');

articlesRouter.route('/').get(getArticles);
articlesRouter
  .route('/:article_id')
  .get(getArticle)
  .patch(sendPatchUpdate)
  .delete(sendDeletedArticle);

module.exports = articlesRouter;
