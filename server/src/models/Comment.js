const Model = require('./Model.js')

class Comment extends Model {
  static get tableName() {
    return 'comments'
  }

  static get relationMappings() {
    const { Event, User } = require('./index.js')

    return {
      event: {
        relation: Model.BelongsToOneRelation,
        modelClass: Event,
        join: {
          from: 'comments.eventId',
          to: 'events.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'comments.userId',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Comment