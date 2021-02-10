const Model = require('./Model.js')

class Year extends Model {
  static get tableName() {
    return 'years'
  }

  static get relationMappings() {
    const { Event } = require('./index.js')

    return {
      events: {
        relation: Model.HasManyRelation,
        modelClass: Event,
        join: {
          from: 'years.id',
          to: 'events.yearId'
        }
      }
    }
  }
}

module.exports = Year