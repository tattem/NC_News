const { sendArticles } = require('../models/topics');

exports.getArticles = (req, res, next) => {
    sendArticles().then(articles => {
        console.log({articles}, '<<<<<< PKOIJIK')
        res.status(200).json({articles})
    })
}