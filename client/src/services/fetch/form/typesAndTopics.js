export default async function () {
  try {
    const response = await fetch(`/api/v1/basics`)
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`)
    }
    const body = await response.json()
    const eventTypes = body.eventTypes.map(eventType => {
      return { key: eventType.id, label: eventType.name, value: eventType.id }
    })
    const studyTopics = body.studyTopics.map(topic => {
      return {
        label: topic.name,
        value: topic.id
      }
    })
    return { eventTypes, studyTopics }
  } catch (error) {
    console.error(error.message)
  }
}