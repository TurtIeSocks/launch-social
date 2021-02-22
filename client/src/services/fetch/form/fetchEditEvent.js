export default async function (eventId) {
  try {
    const response = await fetch(`/api/v1/events/${eventId}`)
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`)
    }
    const body = await response.json()
    const startDate = new Date(parseInt(body.event.startDate))
    const endDate = new Date(parseInt(body.event.endDate))
    for (const [key, value] of Object.entries(body.event)) {
      if (key === 'alerts') body.event[key] = 'false'
      if (key === 'repeats') body.event[key] = 'false'
      if (body.event[key] === null) body.event[key] = ''
    }
    if (body.event.studyTopic) {
      for (const [key, value] of Object.entries(body.event.studyTopic)) {
        if (key === 'id') body.event.studyTopic.value = value
        if (key === 'name') body.event.studyTopic.label = value
      }
    }
    return { ...body.event, eventTypeId: body.event.eventType.id, startDate, endDate }
  } catch (error) {
    console.error(error.message)
  }
}