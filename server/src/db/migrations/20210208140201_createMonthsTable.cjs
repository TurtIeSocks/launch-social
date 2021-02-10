/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable('months', table => {
    table.bigIncrements('id')
    table.string('name').notNullable().unique()
    table.string('short').notNullable()
    table.integer('numOfDays').notNullable()
    table.integer('jsValue').notNullable()
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('months')
}
