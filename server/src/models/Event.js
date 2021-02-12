const Model = require('./Model.js')

class Event extends Model {
  static get tableName() {
    return 'events'
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "eventTypeId", "yearId", "monthId", "day", "hour", "minute", "duration"],
      properties: {
        userId: { type: ["integer", "string"] },
        name: { type: "string", minLength: 1 },
        description: { type: "string" },
        location: { type: "string" },
        url: { type: "string" },
        meetUrl: { type: "string" },
        imageUrl: { type: "string" },
        eventTypeId: { type: ["integer", "string"] },
        studyTopic: { type: "string" },
        yearId: { type: ["integer", "string"] },
        monthId: { type: ["integer", "string"] },
        day: { type: ["integer", "string"] },
        hour: { type: ["integer", "string"] },
        minute: { type: ["integer", "string"] },
        duration: { type: ["integer", "string"] },
        repeats: { type: ["boolean", "string"] },
        alerts: { type: ["boolean", "string"] }
      }
    }
  }
  static get relationMappings() {
    const { Month, Year, EventType, Game, User, Interest } = require('./index.js')

    return {
      month: {
        relation: Model.BelongsToOneRelation,
        modelClass: Month,
        join: {
          from: 'events.monthId',
          to: 'months.id'
        }
      },
      year: {
        relation: Model.BelongsToOneRelation,
        modelClass: Year,
        join: {
          from: 'events.yearId',
          to: 'years.id'
        }
      },
      eventType: {
        relation: Model.BelongsToOneRelation,
        modelClass: EventType,
        join: {
          from: 'events.eventTypeId',
          to: 'eventTypes.id'
        }
      },
      game: {
        relation: Model.BelongsToOneRelation,
        modelClass: Game,
        join: {
          from: 'events.gameId',
          to: 'games.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'events.userId',
          to: 'users.id'
        }
      },
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'events.id',
          through: {
            from: 'interests.eventsId',
            to: 'interests.userId'
          },
          to: 'users.id'
        }
      },
      interests: {
        relation: Model.HasManyRelation,
        modelClass: Interest,
        join: {
          from: 'events.id',
          to: 'interests.eventId'
        }
      }
    }
  }
}

module.exports = Event