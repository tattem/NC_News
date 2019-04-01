exports.up = function(knex, Promise) {
  console.log('creating articles tables');
  return knex.schema.createTable('articles', articlesTable => {
      articlesTable.increments('article_id').primary()
      articlesTable.text('title')
      articlesTable.text('body')
      articlesTable.integer('votes').defaultTo(0)
      articlesTable.text('topic').references('topics.slug')
      articlesTable.text('author').references('users.username')
      articlesTable.datetime('created_at').defaultTo(knex.fn.now(6))
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('articles');
};
