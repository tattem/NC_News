const { sendUsers } = require('../models/users');

exports.getUser = (req, res, next) => {
  sendUsers(req.params)
    .then(([user]) => {
      if (!user) return Promise.reject({ status: 404 });
      res.status(200).json({ user });
    })
    .catch(next);
};
