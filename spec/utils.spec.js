const { expect } = require('chai');
const { convertArticleData } = require('../utils/convertArticleData');
const { convertCommentData } = require('../utils/convertCommentData');

describe('convertArticleData', () => {
  it('returns a new array', () => {
    const articles = [];
    expect(convertArticleData(articles)).to.not.equal(articles);
  });
  it('returns a converted timestamp array', () => {
    const articles = [
      { created_at: 1542284514171 },
      { created_at: 1416140514171 },
      { created_at: 1289996514171 }
    ];
    const convertedArticles = convertArticleData(articles);
    expect(`${convertedArticles[0].created_at}`).to.equal(
      'Thu Nov 15 2018 12:21:54 GMT+0000 (Greenwich Mean Time)'
    );
  });
});

describe('convertCommentData', () => {
  it('returns an array of objects where comments has the corresponding article id based on title-belongs_to relationship, the author, created at and the body', () => {
    const comments = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const articles = [
      {
        article_id: 1,
        title: "They're not exactly dogs, are they?",
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'Well? Think about it.',
        created_at: 533132514171
      }
    ];
    const convertedComments = convertCommentData(comments, articles)
    expect(convertedComments[0]).to.contain.keys('author', 'article_id' , 'created_at', 'body')
  });
});
