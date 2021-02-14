/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.dropTableIfExists('years')

}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.createTable('years', table => {
    table.bigIncrements('id')
    table.integer('year').notNullable().unique()
    table.boolean('leapYear').notNullable()
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  })
}
