/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable('interests', table => {
    table.bigIncrements('id')
    table.bigInteger('eventId')
      .notNullable()
      .index()
      .references('events.id')
      .unsigned()
    table.bigInteger('userId')
      .notNullable()
      .index()
      .references('users.id')
      .unsigned()
    table.string('value').notNullable()
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}


/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('interests')
}
