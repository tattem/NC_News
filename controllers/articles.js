const { sendArticles } = require('../models/articles');

exports.getArticles = (req, res, next) => {
    sendArticles().then(articles => {
        res.status(200).json({articles})
    })
}