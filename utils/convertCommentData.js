exports.convertCommentData = (comments, articles) => {
  return (convertedComments = comments.reduce((comments, comment) => {
    let titledArticle = articles.filter(
      article => article.title === comment.belongs_to
    );
    comments.push({
      author: comment.created_by,
      article_id: titledArticle[0].article_id,
      created_at: new Date(comment.created_at),
      body: comment.body
    });
    return comments;
  }, []));
};
