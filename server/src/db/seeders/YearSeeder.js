import { Year } from "../../models/index.js"

class YearSeeder {
  static async seed() {
    const currentYear = new Date().getFullYear()
    for (let i = 2020; i < currentYear+10; i++) {
      let leapYear = i % 4 === 0 ? true : false 
      await Year.query().insert({ year: i, leapYear})
    }
  }
}

export default YearSeeder
