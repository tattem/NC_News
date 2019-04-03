process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

describe('/', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe('/api', () => {
    it('GET status:200', () => {
      return request
        .get('/api')
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
    describe('/topics', () => {
      it('GET status:200 and returns a nested array within an object of topics', () => {
        return request
          .get('/api/topics')
          .expect(200)
          .then(({ body }) => {
            expect(body.topics[0].description).to.equal(
              'The man, the Mitch, the legend'
            );
            expect(body.topics[0]).to.contain.keys('slug', 'description');
          });
      });
    });
    describe('/articles', () => {
      it('GET status:200 and returns a nested array within an object of articles', () => {
        return request
          .get('/api/articles')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0]).to.contain.keys(
              'author',
              'title',
              'article_id',
              'topic',
              'created_at',
              'votes',
              'comment_count'
            );
          });
      });
      describe('DEFAULT BEHAVIORS', () => {
        it('GET status:200 and returns the date in desc order', () => {
          return request
            .get('/api/articles')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles[0].title).to.equal(
                'Living in the shadow of a great man'
              );
              expect(body.articles[11].title).to.equal('Moustache');
            });
        });
        it('GET status:200 and accepts a where query for author', () => {
          return request
            .get('/api/articles?author=butter_bridge')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles.length).to.equal(3)
            });
        });
        it('GET status:200 and accepts a where query for author and topic', () => {
          return request
            .get('/api/articles?author=rogersop&topic=mitch')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles.length).to.equal(2)
            });
        });
      });
    });
  });
});
