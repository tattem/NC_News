const { sendComments, postComments, updateVotes, deleteComment } = require('../models/comments');

exports.getArticleComments = (req, res, next) => {
  sendComments(req.query, req.params).then(comments => {
    comments.forEach(comment => delete comment.article_id);
    res.status(200).json({ comments });
  });
};

exports.addArticleComment = (req, res, next) => {
  postComments(req.params.article_id, req.body).then(([comment]) => {
    res.status(201).json({ comment });
  });
};

exports.incrementCommentVotes = (req, res, next) => {
  updateVotes(req.params, req.body.inc_votes).then(([comment]) => {
    res.status(201).json({ comment });
  });
};

exports.sendDeletedComment = (req, res, next) => {
  deleteComment(req.params).then(() => {
    res.status(204).send()
  })
}
