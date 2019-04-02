const { articleData, commentData, topicData, userData } = require('../data');
const { convertArticleData } = require('../../utils/convertArticleData');

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex('topics')
        .insert(topicData)
        .returning('*');
    })
    .then(() => {
      return knex('users')
        .insert(userData)
        .returning('*');
    })
    .then(() => {
      // run a method that takes the article data and converts it.
      const convertedArticles = convertArticleData(articleData);
      // console.log(convertedArticles, '<<< converted articles')
      return knex('articles')
        .insert(convertedArticles)
        .returning('*');
      // insert the returned data in to the articles table
    });
};
