/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table('events', table => {
    table.dropColumns('monthId', 'yearId', 'day', 'hour', 'minute', 'duration', 'url', 'imageUrl')
    table.bigInteger('startDate').unsigned()
    table.bigInteger('endDate').unsigned()
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table('events', table => {
    table.dropColumns('startDate', 'endDate')
    table.string('url')
    table.string('imageUrl')
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
  })
}
