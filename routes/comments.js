const commentsRouter = require('express').Router();

const { methodNotAllowed } = require('../errors/index');

const {
  incrementCommentVotes,
  sendDeletedComment
} = require('../controllers/comments');

commentsRouter
  .route('/:comment_id')
  .patch(incrementCommentVotes)
  .delete(sendDeletedComment).all(methodNotAllowed);

module.exports = commentsRouter;
