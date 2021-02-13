/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table('events', table => {
    table.dropColumn('gameName')
    table.dropColumn('maxPlayers')
    table.bigInteger('gameId')
      .index()
      .references('games.id')
      .unsigned()
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table('events', table => {
    table.dropColumn('gameId')
    table.string('gameName')
    table.integer('maxPlayers')
  })
}
