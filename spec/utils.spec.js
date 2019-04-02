const { expect } = require('chai');
const { convertArticleData } = require('../utils/convertArticleData');

describe('convertArticleData', () => {
    it('returns a non mutated array', () => {
        const articles = []
        expect(convertArticleData(articles)).to.not.equal(articles)
    });
    it('returns a converted timestamp array', () => {
        const articles = [{created_at: 1542284514171}, {created_at: 1416140514171}, {created_at: 1289996514171}]
        const convertedArticles = convertArticleData(articles)
        expect(`${convertedArticles[0].created_at}`).to.equal('Thu Nov 15 2018 12:21:54 GMT+0000 (Greenwich Mean Time)')
    });
});