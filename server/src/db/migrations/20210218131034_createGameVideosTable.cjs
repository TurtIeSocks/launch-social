/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable('gameVideos', table => {
    table.bigIncrements('id')
    table.string('videoId').notNullable()
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
  return knex.schema.dropTableIfExists('gameVideos')
}
