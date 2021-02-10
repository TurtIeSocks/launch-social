const Model = require('./Model.js')

class EventType extends Model {
  static get tableName() {
    return 'eventTypes'
  }

  static get relationMappings() {
    const { Event } = require('./index.js')

    return {
      events: {
        relation: Model.HasManyRelation,
        modelClass: Event,
        join: {
          from: 'eventType.id',
          to: 'events.eventTypeId'
        }
      }
    }
  }
}

module.exports = EventType