exports.convertArticleData = articles => {

return convertedArticles = articles.map(article => {
    article.created_at = new Date(article.created_at)
    return article
})

};
