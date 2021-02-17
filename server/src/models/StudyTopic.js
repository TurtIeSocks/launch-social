const Model = require('./Model.js')

class StudyTopic extends Model {
  static get tableName() {
    return 'studyTopics'
  }

  static get relationMappings() {
    const { Event } = require('./index.js')

    return {
      events: {
        relation: Model.HasManyRelation,
        modelClass: Event,
        join: {
          from: 'studyTopics.id',
          to: 'events.studyTopicId'
        }
      }
    }
  }
}

module.exports = StudyTopic