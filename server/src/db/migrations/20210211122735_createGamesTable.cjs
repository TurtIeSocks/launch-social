/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable('games', table => {
    table.bigIncrements('id')
    table.integer('apiId')
    table.string('name')
    table.text('summary')
    table.integer('maxPlayers')
    table.string('coverArt')
    table.string('url')
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('games')
}
