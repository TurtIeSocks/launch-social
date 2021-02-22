export default async function (page) {
  try {
    const response = await fetch(`/api/v1/homepage/${page}`)
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`)
    }
    const body = await response.json()
    return body
  } catch (error) {
    console.error(error.message)
  }
}