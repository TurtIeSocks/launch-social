/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
 exports.up = async (knex) => {
  return knex.schema.createTable('genres', table => {
    table.bigIncrements('id')
    table.integer('apiId').notNullable()
    table.string('name')
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('genres')
}
