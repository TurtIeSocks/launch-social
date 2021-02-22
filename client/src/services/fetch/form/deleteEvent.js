export default async function (eventId) {
  try {
    const response = await fetch(`/api/v1/events/${eventId}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
      })
    })
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`)
  }
}