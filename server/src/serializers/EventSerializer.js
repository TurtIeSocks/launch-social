import GameSerializer from "./GameSerializer.js"
import MonthSerializer from "./MonthSerializer.js"
import YearSerializer from "./YearSerializer.js"
import EventTypeSerializer from "./EventTypeSerializer.js"

class EventSerializer {
  static async getOne(event) {
    const allowedAttributes = ["id", "userId", "name", "description", "location", "url", "meetUrl", "imageUrl", "studyTopic", "day", "hour", "minute", "duration", "repeats", "alerts"]

    const serializedEvent = {}

    for (const attribute of allowedAttributes) {
      serializedEvent[attribute] = event[attribute]
    }

    const month = await event.$relatedQuery('month')
    serializedEvent.month = await MonthSerializer.getOne(month)

    const year = await event.$relatedQuery('year')
    serializedEvent.year = await YearSerializer.getOne(year)

    const eventType = await event.$relatedQuery('eventType')
    serializedEvent.eventType = await EventTypeSerializer.getOne(eventType)

    const game = await event.$relatedQuery('game')
    serializedEvent.gameDetails = await GameSerializer.getOne(game)

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
