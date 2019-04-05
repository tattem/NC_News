const { articleData, commentData, topicData, userData } = require('../data');
const { convertArticleData } = require('../../utils/convertArticleData');
const { convertCommentData } = require('../../utils/convertCommentData');

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
      const convertedArticles = convertArticleData(articleData);
      return insertedArticles = knex('articles')
        .insert(convertedArticles)
        .returning('*');
    })
    .then((insertedArticles) => {
      const convertedComments = convertCommentData(commentData, insertedArticles)
      return knex('comments')
        .insert(convertedComments)
        .returning('*');
    });
};
