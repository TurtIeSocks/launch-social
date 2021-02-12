class EventTypeSerializer {
  static async getOne(eventType) {
    const allowedAttributes = ["id", "name"]

    const serializedEventType = {}

    for (const attribute of allowedAttributes) {
      serializedEventType[attribute] = eventType[attribute]
    }

    return serializedEventType
  }

  static async getAll(eventTypes) {
    return await Promise.all(eventTypes.map(async eventType => {
      const serializedEventType = await EventTypeSerializer.getOne(eventType)
      return serializedEventType
    }))
  }
}

export default EventTypeSerializer
