import translateServerErrors from "../../translateServerErrors.js"

export default async function (eventPayload) {
  try {
    const response = await fetch(`/api/v1/events/`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(eventPayload),
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
    }
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`)
  }
}