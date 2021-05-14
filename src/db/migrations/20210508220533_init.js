exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id");
      table.string("email").notNullable().unique();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.timestamps(true, true);
    })
    .createTable("studios", (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.integer("user_id").references("id").inTable("users");
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExist("users").dropTableIfExist("studios");
};
