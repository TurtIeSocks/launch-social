/* eslint-disable import/no-extraneous-dependencies */

const Model = require("./Model");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    const { Event, Interest } = require('./index.js')

    return {
      events: {
        relation: Model.HasManyRelation,
        modelClass: Event,
        join: {
          from: 'users.id',
          to: 'events.userId'
        }
      },
      interests: {
        relation: Model.ManyToManyRelation,
        modelClass: Event,
        join: {
          from: 'users.id',
          through: {
            from: 'interests.userId',
            to: 'interests.eventId'
          },
          to: 'events.id'
        }
      },
      interest: {
        relation: Model.HasManyRelation,
        modelClass: Interest,
        join: {
          from: 'users.id',
          to: 'interests.userId'
        }
      }
    }
  }
}

module.exports = User;
