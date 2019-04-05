const {
  sendComments,
  postComments,
  updateVotes,
  deleteComment
} = require('../models/comments');

exports.getArticleComments = (req, res, next) => {
  sendComments(req.query, req.params)
    .then(comments => {
      if (comments.length === 0) return Promise.reject({ status: 404 });
      comments.forEach(comment => delete comment.article_id);
      res.status(200).json({ comments });
    })
    .catch(next);
};

exports.addArticleComment = (req, res, next) => {
  postComments(req.params.article_id, req.body)
    .then(([comment]) => {
      res.status(201).json({ comment });
    })
    .catch(next);
};

exports.incrementCommentVotes = (req, res, next) => {
  updateVotes(req.params, req.body.inc_votes)
    .then(([comment]) => {
      if (!comment) return Promise.reject({ status: 404 });
      res.status(201).json({ comment });
    })
    .catch(next);
};

exports.sendDeletedComment = (req, res, next) => {
  sendComments(req.query, req.params)
    .then(([comment]) => {
      if (!comment) return Promise.reject({ status: 404 });
      deleteComment(req.params).then(() => {
        res.status(204).send();
      });
    })
    .catch(next);
};
