const commentsRouter = require('express').Router();

const { incrementCommentVotes } = require('../controllers/comments');

console.log('in the comments router');
commentsRouter.route('/:comment_id').patch(incrementCommentVotes);

module.exports = commentsRouter;