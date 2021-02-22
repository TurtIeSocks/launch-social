export default async function (inputValue) {
  return fetch(`/api/v1/games/names?search=${inputValue}`).then(res => res.json())
}