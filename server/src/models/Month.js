const Model = require('./Model.js')

class Month extends Model {
  static get tableName() {
    return 'months'
  }

  static get relationMappings() {
    const { Event } = require('./index.js')

    return {
      events: {
        relation: Model.HasManyRelation,
        modelClass: Event,
        join: {
          from: 'months.id',
          to: 'events.monthId'
        }
      }
    }
  }
}

module.exports = Month