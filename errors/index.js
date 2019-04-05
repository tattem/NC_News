exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: 'Route Not Found' });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handle400 = (err, req, res, next) => {
  const codes = ['22P02', '42703'];
  if (codes.includes(err.code)) {
    res.status(400).send({ msg: 'Bad Request' });
  } else {
    next(err);
  }
};
exports.handle404 = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: 'Does not exist' });
  } else {
    next(err);
  }
};

exports.handle422 = (err, req, res, next) => {
  const codes = ['23503'];
  if (codes.includes(err.code)) {
    res.status(422).send({ msg: 'unprocessable' });
  } else {
    next(err);
  }
};

exports.handle500 = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'Internal Server Error' });
};
