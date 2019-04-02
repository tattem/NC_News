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
    .then(insertedUsers => {
      const convertedArticles = convertArticleData(articleData);
      const insertedArticles = knex('articles')
        .insert(convertedArticles)
        .returning('*');
      return Promise.all([insertedArticles, insertedUsers]);
    })
    .then(([insertedArticles, insertedUsers]) => {
      const convertedComments = convertCommentData(commentData, insertedArticles)
      console.log(convertedComments, '<<< converted COmments')
      return knex('comments')
        .insert(convertedComments)
        .returning('*');
    });
};
