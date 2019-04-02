const { sendArticles } = require('../models/articles');

exports.getArticles = (req, res, next) => {
    sendArticles(req.query).then(articles => {
        res.status(200).json({articles})
    })
}