import { EventType } from "../../models/index.js"

class EventTypeSeeder {
  static async seed() {

    await EventType.query().insert({ name: 'Gaming' })
    await EventType.query().insert({ name: 'Study Session' })
    await EventType.query().insert({ name: 'Other' })
  }
}

export default EventTypeSeeder
