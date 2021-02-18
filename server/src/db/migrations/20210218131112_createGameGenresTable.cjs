/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable('gameGenres', table => {
    table.bigIncrements('id')
    table.bigInteger('gameId')
      .notNullable()
      .index()
      .references('games.id')
      .unsigned()
    table.bigInteger('genreId')
      .notNullable()
      .index()
      .references('genres.id')
      .unsigned()
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('gameGenres')
}
