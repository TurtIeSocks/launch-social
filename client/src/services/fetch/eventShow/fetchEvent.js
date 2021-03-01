export default async function (eventId) {
  try {
    const response = await fetch(`/api/v1/events/${eventId}`)
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`)
    }
    const body = await response.json()
    return body
  } catch (error) {
    console.error(error.message)
  }
}