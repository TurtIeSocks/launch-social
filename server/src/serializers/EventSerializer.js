import GameSerializer from "./GameSerializer.js"
import EventTypeSerializer from "./EventTypeSerializer.js"
import InterestSerializer from "./InterestSerializer.js"
import UserSerializer from "./UserSerializer.js"
import StudyTopicSerializer from './StudyTopicSerializer.js'
import CommentSerializer from './CommentSerializer.js'

import { Interest, Event, Comment } from '../models/index.js'

class EventSerializer {
  static async getOne(event) {
    const allowedAttributes = ["id", "userId", "name", "description", "location", "meetUrl", "startDate", "endDate", "repeats", "alerts"]

    const serializedEvent = {}

    for (const attribute of allowedAttributes) {
      serializedEvent[attribute] = event[attribute]
    }

    const user = await event.$relatedQuery('user')
    serializedEvent.user = await UserSerializer.getOne(user)

    const eventType = await event.$relatedQuery('eventType')
    serializedEvent.eventType = await EventTypeSerializer.getOne(eventType)

    if (event.gameId) {
      const game = await event.$relatedQuery('game')
      serializedEvent.gameDetails = await GameSerializer.getOne(game)
    } else if (event.studyTopicId) {
      const studyTopic = await event.$relatedQuery('studyTopic')
      serializedEvent.studyTopic = await StudyTopicSerializer.getOne(studyTopic)
    }

    const userInterests = await event.$relatedQuery('interests')
    serializedEvent.userInterests = await InterestSerializer.getAll(userInterests)

    const comments = await event.$relatedQuery('comments').orderBy('createdAt')
    serializedEvent.comments = await CommentSerializer.getAll(comments)

    return serializedEvent
  }

  static async getHomepage(event, userId) {
    const allowedAttributes = ["id", "name", "description", "startDate", "endDate"]

    const serializedEvent = {}

    for (const attribute of allowedAttributes) {
      serializedEvent[attribute] = event[attribute]
    }

    const user = await event.$relatedQuery('user')
    serializedEvent.user = await UserSerializer.getOne(user)

    if (userId) {
      const userInterest = await event.$relatedQuery('interests')
        .where('userId', userId)
        .first()
      if (userInterest) {
        serializedEvent.userInterests = await InterestSerializer.getOne(userInterest)
      }
    } else {
      const userInterests = await event.$relatedQuery('interests')
      serializedEvent.userInterests = await InterestSerializer.getAll(userInterests)
    }

    if (event.gameId) {
      const game = await event.$relatedQuery('game')
      serializedEvent.coverArt = await GameSerializer.homepage(game)
    } else if (event.studyTopicId) {
      const studyTopic = await event.$relatedQuery('studyTopic')
      serializedEvent.studyTopic = await StudyTopicSerializer.homepage(studyTopic)
    }

    serializedEvent.totalAttending = await Interest.query()
      .where('eventId', event.id)
      .andWhere('value', 'attending')
      .count({ value: 'value' })
      .first()

    serializedEvent.totalInterests = await Interest.query()
      .where('eventId', event.id)
      .andWhere('value', 'interested')
      .count({ value: 'value' })
      .first()

    serializedEvent.totalComments = await Comment.query()
      .where('eventId', event.id)
      .count({ value: 'comment' })
      .first()

    return serializedEvent
  }

  static async getAllHomepage(events, userId) {
    return await Promise.all(events.map(async event => {
      const serializedEvent = await EventSerializer.getHomepage(event, userId)
      return serializedEvent
    }))
  }

  static async getStats() {
    const stats = {}

    stats.gameStats = await Event.query()
      .count({ total: 'gameId' })
      .where('gameId', '>', 0)
      .withGraphFetched('game')
      .modifyGraph('game', builder => {
        builder.select('id', 'name', 'url')
      })
      .groupBy('gameId')
      .orderBy('total', 'desc')
      .limit(10)

    stats.studyStats = await Event.query()
      .count({ total: 'studyTopicId' })
      .where('studyTopicId', '>', 0)
      .withGraphFetched('studyTopic')
      .modifyGraph('studyTopic', builder => {
        builder.select('id', 'name')
      })
      .groupBy('studyTopicId')
      .orderBy('total', 'desc')
      .limit(10)

    return stats
  }
}
export default EventSerializer
