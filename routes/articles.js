const articlesRouter = require('express').Router();
const {
  getArticles,
  getArticle,
  sendPatchUpdate,
  sendDeletedArticle
} = require('../controllers/articles');
const {
  getArticleComments,
  addArticleComment
} = require('../controllers/comments');
const { methodNotAllowed } = require('../errors/index');

articlesRouter
  .route('/')
  .get(getArticles)
  .all(methodNotAllowed);

articlesRouter
  .route('/:article_id')
  .get(getArticle)
  .patch(sendPatchUpdate)
  .delete(sendDeletedArticle)
  .all(methodNotAllowed);

articlesRouter
  .route('/:article_id/comments')
  .get(getArticleComments)
  .post(addArticleComment)
  .all(methodNotAllowed);

module.exports = articlesRouter;
