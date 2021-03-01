export default async function (eventId, commentId) {
  try {
    const response = await fetch(`/api/v1/events/${eventId}/comments/${commentId}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
      })
    })
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`)
  }
}