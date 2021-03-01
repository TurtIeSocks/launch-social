import { Interest, User, Event } from "../../models/index.js"

class InterestSeeder {
  static async seed() {

    const userCount = await User.query().count('id as value').first()
    const eventCount = await Event.query().count('id as value').first()

    for (let i = 1; i <= parseInt(userCount.value); i++) {
      for (let j = 1; j <= parseInt(eventCount.value); j++) {
        const random = Math.floor(Math.random() * 3)
        if (random !== 2) {
          await Interest.query().insert({
            userId: i,
            eventId: j,
            value: random ? 'attending' : 'interested'
          })
        }
      }
    }
  }
}

export default InterestSeeder
