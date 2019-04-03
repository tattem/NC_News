const { sendComments } = require('../models/comments');

exports.getArticleComments = (req, res, next) => {
  sendComments(req.query, req.params).then(comments => {
    comments.forEach(comment => delete comment.article_id);
    res.status(200).json({ comments });
  });
};
