import GameSerializer from "./GameSerializer.js"
import EventTypeSerializer from "./EventTypeSerializer.js"
import { Interest } from '../models/index.js'
import InterestSerializer from "./InterestSerializer.js"
import UserSerializer from "./UserSerializer.js"

class EventSerializer {
  static async getOne(event) {
    const allowedAttributes = ["id", "userId", "name", "description", "location", "url", "meetUrl", "imageUrl", "studyTopic", "startDate", "endDate", "repeats", "alerts"]

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
}
export default EventSerializer
