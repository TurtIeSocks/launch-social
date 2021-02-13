import { connection } from "../boot.js"
import MonthSeeder from './seeders/MonthSeeder.js'
import YearSeeder from './seeders/YearSeeder.js' 
import EventTypesSeeder from './seeders/EventTypesSeeder.js' 
import GameSeeder from "./seeders/GameSeeder.js"
import EventSeeder from "./seeders/EventSeeder.js"

class Seeder {
  static async seed() {

    console.log("seeding months")
    await MonthSeeder.seed()

    console.log("seeding years")
    await YearSeeder.seed()

    console.log("seeding event types")
    await EventTypesSeeder.seed()

    console.log("seeding games... (this might take a bit)")
    await GameSeeder.seed() 

    console.log('seeding events')
    await EventSeeder.seed()
    
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
