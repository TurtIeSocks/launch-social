class YearSerializer {
  static async getOne(year) {
    const allowedAttributes = ["id", "year", "leapYear"]

    const serializedYear = {}

    for (const attribute of allowedAttributes) {
      serializedYear[attribute] = year[attribute]
    }

    return serializedYear
  }

  static async getAll(years) {
    return await Promise.all(years.map(async year => {
      const serializedYear = await YearSerializer.getOne(year)
      return serializedYear
    }))
  }
}

export default YearSerializer
