import GameSerializer from "./GameSerializer.js"
import EventTypeSerializer from "./EventTypeSerializer.js"
import InterestSerializer from "./InterestSerializer.js"
import UserSerializer from "./UserSerializer.js"
import StudyTopicSerializer from './StudyTopicSerializer.js'

import { Interest, Event } from '../models/index.js'

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

    if (serializedEvent.eventType.id == 1) {
      const game = await event.$relatedQuery('game')
      serializedEvent.gameDetails = await GameSerializer.getOne(game)
    } else if (serializedEvent.eventType.id == 2) {
      const studyTopic = await event.$relatedQuery('studyTopic')
      serializedEvent.studyTopic = await StudyTopicSerializer.getOne(studyTopic)
    }

    const userInterests = await event.$relatedQuery('interests')
    serializedEvent.userInterests = await InterestSerializer.getAll(userInterests)

    serializedEvent.totalAttending = await Interest.query()
      .where('eventId', serializedEvent.id)
      .andWhere('value', 'attending')
      .count({ value: 'value' })
      .first()
    serializedEvent.totalInterests = await Interest.query()
      .where('eventId', serializedEvent.id)
      .andWhere('value', 'interested')
      .count({ value: 'value' })
      .first()

    return serializedEvent
  }

  static async getAll(events) {
    return await Promise.all(events.map(async event => {
      const serializedEvent = await EventSerializer.getOne(event)
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
