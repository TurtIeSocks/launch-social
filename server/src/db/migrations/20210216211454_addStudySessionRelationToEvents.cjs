/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table('events', table => {
    table.dropColumn('studyTopic')
    table.bigInteger('studyTopicId')
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table('events', table => {
    table.dropColumn('studyTopicId')
    table.string('studyTopic')
  })
}
