import { Game, GameImage, GameVideo, GamePlatform } from "../../models/index.js"
import Igdb from '../../apiClient/Igdb.js'

class GameSeeder {
  static async seed() {
    const gameIds = [1877, 7348, 109462, 1067, 7346, 111469, 115, 1905, 121, 3277, 27789, 3182, 72, 1911, 90101, 11198, 40927, 114795, 25657]

    for (let i = 0; i < gameIds.length; i++) {
      const gameDetails = await Igdb.seedGames(gameIds[i])
      let { id, name, cover, multiplayer_modes, platforms, screenshots, summary, url, videos } = gameDetails[0]
      if (!multiplayer_modes) multiplayer_modes = [{onlinemax: 1}]
      console.log(`Seeding ${name}...`)
      const newGame = await Game.query()
        .insert({ apiId: id, name: name, summary: summary, maxPlayers: multiplayer_modes[0].onlinemax, coverArt: cover.image_id, url: url })
        .returning('*')
      const gameId = newGame.id
      
      if (screenshots) {
        for (const image of screenshots) {
          await GameImage.query().insert({ imageId: image.image_id, gameId })
        }  
      }
      if (videos) {
        for (const video of videos) {
          await GameVideo.query().insert({ videoId: video.video_id, gameId })
        }  
      }
      if (platforms) {
        for (const platform of platforms) {
          let name = platform.name ? platform.name : null
          let imageId = platform.platform_logo ? platform.platform_logo.image_id : null
          await GamePlatform.query().insert({ name, imageId, gameId })
        }  
      }
    }
  }
}

export default GameSeeder
