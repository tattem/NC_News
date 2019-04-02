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
      it('GET status:200 and returns a nested array within an object of articles',() => {
          return request
            .get('/api/articles')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles[0].body).to.equal(
                'I find this existence challenging'
              );
            });
        });
    });
  });
});
