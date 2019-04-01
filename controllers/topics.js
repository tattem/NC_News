const { sendTopics } = require('../models/topics');

exports.getTopics = (req, res, next) => {
    sendTopics().then(topics => {
        res.status(200).json({topics})
    })
}