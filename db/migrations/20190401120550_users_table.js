exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', usersTable => {
    usersTable
      .text('username')
      .primary()
      .unique();
    usersTable.text('avatar_url');
    usersTable.text('name');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
