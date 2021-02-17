import { connection } from "../boot.js"
import EventTypesSeeder from './seeders/EventTypesSeeder.js' 
import GameSeeder from "./seeders/GameSeeder.js"
import EventSeeder from "./seeders/EventSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"
import InterestSeeder from "./seeders/InterestSeeder.js"
import StudyTopicSeeder from "./seeders/StudyTopicsSeeder.js"

class Seeder {
  static async seed() {

    console.log("seeding users")
    await UserSeeder.seed()

    console.log("seeding event types")
    await EventTypesSeeder.seed()

    console.log("seeding games... (this might take a bit)")
    await GameSeeder.seed() 

    console.log('seeding study topics')
    await StudyTopicSeeder.seed()

    console.log('seeding events')
    await EventSeeder.seed()

    console.log("seeding interests")
    await InterestSeeder.seed()
    
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
