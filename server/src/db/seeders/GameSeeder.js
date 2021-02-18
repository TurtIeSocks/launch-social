import { Game, GameImage, GameVideo, GamePlatform, Platform, GameGenre, Genre } from "../../models/index.js"
import Igdb from '../../apiClient/Igdb.js'

class GameSeeder {
  static async seed() {
    const gameIds = [72, 115, 121, 891, 1020, 1067, 1279, 1877, 1905, 1911, 2350, 2963, 3182, 3277, 7346, 7348, 8173, 88894, 11137, 12515, 19164, 25657, 26192, 27789, 40927, 90101, 109462, 103341, 11198, 111469, 114795, 125174]

    for (let i = 0; i < gameIds.length; i++) {
      const gameDetails = await Igdb.seedGames(gameIds[i])
      let { id, name, cover, multiplayer_modes, platforms, genres, screenshots, summary, url, videos } = gameDetails[0]
      if (!multiplayer_modes) multiplayer_modes = [{ onlinemax: 1 }]
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
        let platformId
        for (const platform of platforms) {
          const checkIfPlatformExists = await Platform.query().findOne({ apiId: platform.id })
          if (!checkIfPlatformExists) {
            const apiId = platform.id
            const name = platform.name ? platform.name : null
            const imageId = platform.platform_logo ? platform.platform_logo.image_id : null
            const newPlatform = await Platform.query()
              .insert({ apiId, name, imageId })
              .returning('*')
            platformId = newPlatform.id
          } else {
            platformId = checkIfPlatformExists.id
          }
          await GamePlatform.query().insert({ gameId, platformId })
        }
      }

      if (genres) {
        let genreId
        for (const genre of genres) {
          const checkIfGenreExists = await Genre.query().findOne({ apiId: genre.id })
          if (!checkIfGenreExists) {
            const apiId = genre.id
            const name = genre.name ? genre.name : null
            const newGenre = await Genre.query()
              .insert({ apiId, name })
              .returning('*')
            genreId = newGenre.id
          } else {
            genreId = checkIfGenreExists.id
          }
          await GameGenre.query().insert({ gameId, genreId })
        }
      }
    }
  }
}

export default GameSeeder
