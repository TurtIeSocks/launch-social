/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable('events', table => {
    table.bigIncrements('id')
    table.bigInteger('userId')
      .notNullable()
      .index()
      .references('users.id')
      .unsigned()
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.string('location')
    table.string('meetUrl')
    table.bigInteger('eventTypeId')
      .notNullable()
      .index()
      .references('eventTypes.id')
      .unsigned()
    table.bigInteger('gameId')
      .index()
      .references('games.id')
      .unsigned()
    table.bigInteger('studyTopicId')
      .index()
      .references('studyTopics.id')
      .unsigned()
    table.bigInteger('startDate').unsigned()
    table.bigInteger('endDate').unsigned()
    table.boolean('repeats')
    table.boolean('alerts')
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('events')
}
