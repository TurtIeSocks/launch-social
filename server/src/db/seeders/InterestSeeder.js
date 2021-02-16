import { Interest } from "../../models/index.js"

class InterestSeeder {
  static async seed() {

    for (let i = 1; i <= 5; i++) {
      for (let j = 1; j <= 10; j++) {
        const random = Math.floor(Math.random() * 2)
        await Interest.query().insert({
          userId: i,
          eventId: j,
          value: random ? 'attending' : 'interested'
        })
      }
    }

  }
}

export default InterestSeeder
