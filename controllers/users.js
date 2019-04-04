const { sendUsers } = require('../models/users');

exports.getUser = (req, res, next) => {
    sendUsers(req.params).then(([user]) => {
        res.status(200).json({user})
    })
}