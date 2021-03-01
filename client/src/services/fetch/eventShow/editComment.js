import translateServerErrors from "../../translateServerErrors.js"

export default async function (eventId, commentId, commentPayload) {
  try {
    const response = await fetch(`/api/v1/events/${eventId}/comments/${commentId}`, {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(commentPayload),
    })
    if (!response.ok) {
      if (response.status === 422) {
        const body = await response.json()
        const newErrors = translateServerErrors(body.errors)
        return newErrors
      } else {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
    } else {
      return []
    }
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`)
  }
}