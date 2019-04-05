process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

describe('/', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe('ERROR HANDLING - general', () => {
    it('GET status:404 when given a path not accounted for', () => {
      return request.get('/api/treasure').expect(404);
    });
  });

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
      describe('DEFAULT BEHAVIOURS', () => {
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
              expect(body.articles.length).to.equal(3);
            });
        });
        it('GET status:200 and accepts a where query for author and topic', () => {
          return request
            .get('/api/articles?author=rogersop&topic=mitch')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles.length).to.equal(2);
            });
        });
      });
      describe('ERROR HANDLING', () => {
        it('GET status:404 when passed an incorrect key for query', () => {
          return request
            .get('/api/articles?colin=butter_bridge')
            .expect(404)
        });
        it('GET status:405 for an invalid method', () => {
          const methods = ['put', 'post', 'patch', 'delete'];
          const methodPromises = methods.map(method =>
            request[method]('/api/articles').expect(405)
          );
          return Promise.all(methodPromises);
        });
      });
      describe('/:article_id', () => {
        it('GET status:200 and returns an article matching the parametric endpoint id', () => {
          return request
            .get('/api/articles/2')
            .expect(200)
            .then(({ body }) => {
              expect(body.article).to.contain.keys(
                'author',
                'title',
                'article_id',
                'body',
                'topic',
                'created_at',
                'votes',
                'comment_count'
              );
              expect(body.article.title).to.equal('Sony Vaio; or, The Laptop');
            });
        });
        it('PATCH status:201 and returns the updated patched article positive', () => {
          return request
            .patch('/api/articles/2')
            .send({ inc_votes: 5 })
            .expect(201)
            .then(({ body }) => {
              expect(body.article.votes).to.equal(5);
            });
        });
        it('PATCH status:201 and returns the updated patched article negative', () => {
          return request
            .patch('/api/articles/2')
            .send({ inc_votes: -5 })
            .expect(201)
            .then(({ body }) => {
              expect(body.article.votes).to.equal(-5);
            });
        });
        it('DELETE status:204 and deletes the endpoint article', () => {
          const deletedChecked = request
            .get('/api/articles/2')
            .expect(200)
            .then(({ body }) => {
              expect(body.article.title).to.equal('Sony Vaio; or, The Laptop');
              const deleted = request
                .delete('/api/articles/2')
                .expect(204)
                .then(() => {
                  return request.get('/api/articles/2').expect(404);
                });
              return deleted;
            });
          return deletedChecked;
        });
        describe('ERROR HANDLING', () => {
          it('GET status:400 for an impossible article id para endpoint', () => {
            return request.get('/api/articles/wrong').expect(400);
          });
          it('GET status:404 for a non existant article id para endpoint', () => {
            return request.get('/api/articles/500').expect(404);
          });
          it('GET status:400 for an impossible article id para endpoint', () => {
            return request
              .patch('/api/articles/BigBernie')
              .send({ inc_votes: -5 })
              .expect(400);
          });
          it('GET status:404 for a non existant article id para endpoint', () => {
            return request
              .patch('/api/articles/500')
              .send({ inc_votes: -5 })
              .expect(404);
          });
          it("GET status:400 for bad request when given an increment that isn't a number", () => {
            return request
              .patch('/api/articles/2')
              .send({ inc_votes: 'lilLatitia' })
              .expect(400);
          });
          it('GET status:400 for an impossible article id para endpoint', () => {
            return request.delete('/api/articles/BigTrev').expect(400);
          });
          it('GET status:404 for a non existant article id para endpoint', () => {
            return request.delete('/api/articles/500').expect(404);
          });
          it('GET status:405 for an invalid method', () => {
            const methods = ['put', 'post'];
            const methodPromises = methods.map(method =>
              request[method]('/api/articles/2').expect(405)
            );
            return Promise.all(methodPromises);
          });
        });
        describe('/comments', () => {
          it('GET status:200 and returns an array of comments for an article id', () => {
            return request
              .get('/api/articles/1/comments')
              .expect(200)
              .then(({ body }) => {
                expect(body.comments.length).to.equal(13);
                expect(body.comments[0]).to.contain.keys(
                  'comment_id',
                  'votes',
                  'created_at',
                  'author',
                  'body'
                );
              });
          });
          it('POST status:200 and adds a new comment to an article and returns an object of the posted comment', () => {
            return request
              .post('/api/articles/1/comments')
              .send({
                username: 'rogersop',
                body:
                  'https://www.google.com/search?q=git+meme&rlz=1C5CHFA_enGB838GB838&tbm=isch&source=iu&ictx=1&fir=cjaPnsdSLrgVQM%253A%252CkHwsr7YoUPRbDM%252C_&vet=1&usg=AI4_-kT7P9YJ3phjdLYGWJ_FJIegsjc7dw&sa=X&ved=2ahUKEwj4_N-z-rXhAhWWURUIHfteAiYQ9QEwBHoECAYQDA#imgrc=TVDimyimo2AlDM:&vet=1'
              })
              .expect(201)
              .then(({ body }) => {
                expect(body.comment.author).to.equal('rogersop');
                expect(body.comment.body).to.equal(
                  'https://www.google.com/search?q=git+meme&rlz=1C5CHFA_enGB838GB838&tbm=isch&source=iu&ictx=1&fir=cjaPnsdSLrgVQM%253A%252CkHwsr7YoUPRbDM%252C_&vet=1&usg=AI4_-kT7P9YJ3phjdLYGWJ_FJIegsjc7dw&sa=X&ved=2ahUKEwj4_N-z-rXhAhWWURUIHfteAiYQ9QEwBHoECAYQDA#imgrc=TVDimyimo2AlDM:&vet=1'
                );
                expect(body.comment).to.contain.keys(
                  'comment_id',
                  'votes',
                  'created_at',
                  'article_id',
                  'author',
                  'body'
                );
              });
          });
          describe('DEFAULT BEHAVIOURS', () => {
            it('GET status:200 and returns the created_at in desc order', () => {
              return request
                .get('/api/articles/1/comments')
                .expect(200)
                .then(({ body }) => {
                  expect(body.comments[0].body).to.equal(
                    'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.'
                  );
                  expect(body.comments[12].body).to.equal(
                    'This morning, I showered for nine minutes.'
                  );
                });
            });
            it('GET status:200 and accepts a sort_by query', () => {
              return request
                .get('/api/articles/1/comments?sort_by=body')
                .expect(200)
                .then(({ body }) => {
                  expect(body.comments[0].body).to.equal(
                    'git push origin master'
                  );
                  expect(body.comments[12].body).to.equal(
                    ' I carry a log — yes. Is it funny to you? It is not to me.'
                  );
                });
            });
            it('GET status:200 and accepts a order query', () => {
              return request
                .get('/api/articles/1/comments?order=asc')
                .expect(200)
                .then(({ body }) => {
                  expect(body.comments[0].body).to.equal(
                    'This morning, I showered for nine minutes.'
                  );
                  expect(body.comments[12].body).to.equal(
                    'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.'
                  );
                });
            });
          });
          describe('ERROR HANDLING', () => {
            it('GET status:400 for an impossible article id para endpoint on comments req', () => {
              return request.get('/api/articles/wrong/comments').expect(400);
            });
            it('GET status:404 for a non existant article id para endpoint', () => {
              return request.get('/api/articles/500/comments').expect(404);
            });
            it('GET status:422 for an unprocessable username (does not exist in users)', () => {
              return request
                .post('/api/articles/1/comments')
                .send({
                  username: 'TinyTimmy',
                  body: 'sent'
                })
                .expect(422);
            });
            it('GET status:422 for an unprocessable username (does not exist in users)', () => {
              return request
                .post('/api/articles/1/comments')
                .send({
                  username: 'TinyTimmy',
                })
                .expect(400);
            });
            it('GET status:405 for an invalid method', () => {
              const methods = ['put', 'patch', 'delete'];
              const methodPromises = methods.map(method =>
                request[method]('/api/articles/1/comments').expect(405)
              );
              return Promise.all(methodPromises);
            });
          });
        });
      });
    });
    describe('/comments', () => {
      describe('/:comment_id', () => {
        it('PATCH status:201 and increments the vote on the comment id', () => {
          return request
            .patch('/api/comments/4')
            .send({ inc_votes: 5 })
            .expect(201)
            .then(({ body }) => {
              expect(body.comment).to.contain.keys(
                'comment_id',
                'votes',
                'created_at',
                'article_id',
                'author',
                'body'
              );
              expect(body.comment.votes).to.equal(5);
            });
        });
        it('DELETE status:204 and deletes the endpoint comment', () => {
          const deletedChecked = request
            .get('/api/articles/1')
            .expect(200)
            .then(({ body }) => {
              expect(body.article.comment_count).to.equal('13');
              const deleted = request
                .delete('/api/comments/2')
                .expect(204)
                .then(() => {
                  return request
                    .get('/api/articles/1')
                    .expect(200)
                    .then(({ body }) => {
                      expect(body.article.comment_count).to.equal('12');
                    });
                });
              return deleted;
            });
          return deletedChecked;
        });
      });
      describe('ERROR HANDLING', () => {
        it('GET status:400 for an impossible comment id para endpoint', () => {
          return request
            .patch('/api/comments/MassiveMary')
            .send({ inc_votes: -5 })
            .expect(400);
        });
        it('GET status:404 for a non existant comment id para endpoint', () => {
          return request
            .patch('/api/comments/500')
            .send({ inc_votes: 5 })
            .expect(404);
        });
        it("GET status:400 for bad request when given an increment that isn't a number", () => {
          return request
            .patch('/api/comments/2')
            .send({ inc_votes: 'AboveAverageAllen' })
            .expect(400);
        });
        it('GET status:400 for an impossible comment id para endpoint', () => {
          return request.delete('/api/comments/BigTrev').expect(400);
        });
        it('GET status:404 for a non existant comment id para endpoint', () => {
          return request.delete('/api/comments/500').expect(404);
        });
        it('GET status:405 for an invalid method', () => {
          const methods = ['put', 'post', 'get'];
          const methodPromises = methods.map(method =>
            request[method]('/api/comments/2').expect(405)
          );
          return Promise.all(methodPromises);
        });
      });
    });
    describe('/users', () => {
      describe('/:username', () => {
        it('GET status:200 and returns the details for the user endpoint', () => {
          return request
            .get('/api/users/rogersop')
            .expect(200)
            .then(({ body }) => {
              expect(body.user).to.contain.keys(
                'username',
                'avatar_url',
                'name'
              );
              expect(body.user.name).to.equal('paul');
            });
        });
      });
      describe('ERROR HANDLING', () => {
        it('GET status:404 for a non existant article id para endpoint', () => {
          return request.get('/api/users/ColinTheCaterpillar').expect(404);
        });
      });
    });
  });
});
