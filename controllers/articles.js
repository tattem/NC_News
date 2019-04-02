const { sendArticles } = require('../models/articles');

exports.getArticles = (req, res, next) => {
    sendArticles().then(articles => {
        console.log(articles, '<<< articles')
        res.status(200).json({articles})
    })
}