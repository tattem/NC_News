exports.up = function(knex, Promise) {
    return knex.schema.createTable('comments', commentsTable => {
        commentsTable.increments('comment_id').primary()
        commentsTable.text('author').references('users.username')
        commentsTable.integer('article_id').references('articles.article_id').onDelete('CASCADE')
        commentsTable.integer('votes').defaultTo(0)
        commentsTable.datetime('created_at').defaultTo(knex.fn.now())
        commentsTable.text('body')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comments');
};
