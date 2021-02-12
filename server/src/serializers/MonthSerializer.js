class MonthSerializer {
  static async getOne(month) {
    const allowedAttributes = ["id", "name", "numOfDays", "jsValue"]

    const serializedMonth = {}

    for (const attribute of allowedAttributes) {
      serializedMonth[attribute] = month[attribute]
    }

    return serializedMonth
  }
  
  static async getAll(months) {
    return await Promise.all(months.map(async month => {
      const serializedMonth = await MonthSerializer.getOne(month)
      return serializedMonth
    }))
  }
}

export default MonthSerializer
