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
    table.string('description')
    table.string('location')
    table.string('url')
    table.string('meetUrl')
    table.string('imageUrl')
    table.bigInteger('eventTypeId')
      .notNullable()
      .index()
      .references('eventTypes.id')
      .unsigned()
    table.string('gameName')
    table.integer('maxPlayers')
    table.string('studyTopic')
    table.bigInteger('yearId').notNullable()
      .notNullable()
      .index()
      .references('years.id')
      .unsigned()
    table.bigInteger('monthId').notNullable()
      .notNullable()
      .index()
      .references('months.id')
      .unsigned()
    table.integer('day').notNullable()
    table.integer('hour').notNullable()
    table.integer('minute').notNullable()
    table.integer('duration').notNullable()
    table.boolean('repeats').notNullable()
    table.boolean('alerts').notNullable()
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
