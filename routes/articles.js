const articlesRouter = require('express').Router();
const {getArticles, getArticle, sendPatchUpdate} = require('../controllers/articles')

articlesRouter.route('/').get(getArticles)
articlesRouter.route('/:article_id').get(getArticle).patch(sendPatchUpdate)


module.exports = articlesRouter;