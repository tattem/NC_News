const ENV = process.env.NODE_ENV === 'test' ? 'test' : 'development'
console.log(ENV, '<< enviro')

const development = require('./dev-data');
const test = require('./test-data');

const data = {
  development,
  test,
};

module.exports = data[ENV];
