import { Month } from "../../models/index.js"

class MonthSeeder {
  static async seed() {

    await Month.query().insert({ name: 'January', short: 'Jan', numOfDays: 31, jsValue: 0 })
    await Month.query().insert({ name: 'February', short: 'Feb', numOfDays: 28, jsValue: 1 })
    await Month.query().insert({ name: 'February (Leap)', short: 'Feb', numOfDays: 29, jsValue: 1 })
    await Month.query().insert({ name: 'March', short: 'Mar', numOfDays: 31, jsValue: 2 })
    await Month.query().insert({ name: 'April', short: 'Apr', numOfDays: 30, jsValue: 3 })
    await Month.query().insert({ name: 'May', short: 'May', numOfDays: 31, jsValue: 4 })
    await Month.query().insert({ name: 'June', short: 'Jun', numOfDays: 30, jsValue: 5 })
    await Month.query().insert({ name: 'July', short: 'Jul', numOfDays: 31, jsValue: 6 })
    await Month.query().insert({ name: 'August', short: 'Aug', numOfDays: 31, jsValue: 7 })
    await Month.query().insert({ name: 'September', short: 'Sep', numOfDays: 30, jsValue: 8 })
    await Month.query().insert({ name: 'October', short: 'Oct', numOfDays: 31, jsValue: 9 })
    await Month.query().insert({ name: 'November', short: 'Nov', numOfDays: 30, jsValue: 10 })
    await Month.query().insert({ name: 'December', short: 'Dec', numOfDays: 31, jsValue: 11 })
  }
}

export default MonthSeeder
