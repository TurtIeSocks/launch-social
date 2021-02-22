export default async function (eventId, interestPayload) {
  try {
    const response = await fetch(`/api/v1/events/${eventId}/interests`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(interestPayload)
    })
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`)
    }
    const body = await response.json()
    return body
  } catch (error) {
    console.error(error.message)
  }
}
