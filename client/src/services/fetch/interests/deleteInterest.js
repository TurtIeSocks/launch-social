export default async function (eventId) {
  try {
    const response = await fetch(`/api/v1/events/${eventId}/interests`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify()
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
