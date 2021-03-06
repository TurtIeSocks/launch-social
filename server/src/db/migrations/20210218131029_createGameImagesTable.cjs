/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable('gameImages', table => {
    table.bigIncrements('id')
    table.string('imageId').notNullable()
    table.bigInteger('gameId')
      .notNullable()
      .index()
      .references('games.id')
      .unsigned()
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('gameImages')
}
