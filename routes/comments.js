const commentsRouter = require('express').Router();

const {
  incrementCommentVotes,
  sendDeletedComment
} = require('../controllers/comments');

console.log('in the comments router');
commentsRouter
  .route('/:comment_id')
  .patch(incrementCommentVotes)
  .delete(sendDeletedComment);

module.exports = commentsRouter;
