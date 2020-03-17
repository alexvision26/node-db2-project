exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments();
    tbl.integer("VIN #").unique();
    tbl
      .string("Make", 255)
      .notNullable()
      .index();
    tbl.string("Model", 255).notNullable();
    tbl.integer("Mileage").notNullable();
    tbl.string("Title Status", 255);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
