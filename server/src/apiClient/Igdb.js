import axios from 'axios'
import config from '../config.js'

class Igdb {
  static async getGames(search) {
    const apiResponse = await axios({
      url: "https://api.igdb.com/v4/games",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': config.twitchId,
        'Authorization': `Bearer ${config.twitchToken}`,
      },
      data: `search "${search}"; fields name,summary,url,multiplayer_modes.onlinemax,cover.image_id,screenshots.image_id,videos.video_id,platforms.name,platforms.platform_logo.image_id;`
    })
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.error(err)
      })
    return apiResponse
  }

  static async seedGames(gameId) {
    const apiResponse = await axios({
      url: "https://api.igdb.com/v4/games",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': config.twitchId,
        'Authorization': `Bearer ${config.twitchToken}`,
      },
      data: `fields name,summary,url,multiplayer_modes.onlinemax,cover.image_id,screenshots.image_id,videos.video_id,platforms.name,platforms.platform_logo.image_id; where id = ${gameId};`
    })
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.error(err)
      })
    return apiResponse
  }
}

export default Igdb
