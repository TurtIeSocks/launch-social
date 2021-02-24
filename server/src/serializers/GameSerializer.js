import GameMediaSerializer from './GameMediaSerializer.js' 

class GameSerializer {
  static async getOne(game) {
    const allowedAttributes = ["apiId","name", "summary", "maxPlayers", "coverArt", "url"]

    const serializedGame = {}

    for (const attribute of allowedAttributes) {
      serializedGame[attribute] = game[attribute]
    }

    const images = await game.$relatedQuery('gameImages')
    serializedGame.images = await GameMediaSerializer.getAllImages(images)

    const videos = await game.$relatedQuery('gameVideos')
    serializedGame.videos = await GameMediaSerializer.getAllVideos(videos)

    const platforms = await game.$relatedQuery('gamePlatforms')
    serializedGame.platforms = await GameMediaSerializer.getAllPlatforms(platforms)

    const genres = await game.$relatedQuery('gameGenres')
    serializedGame.genres = await GameMediaSerializer.getAllGenres(genres)

    return serializedGame
  }

  static async getAll(games) {
    return await Promise.all(games.map(async game => {
      const serializedGame = await GameSerializer.getOne(game)
      return serializedGame
    }))
  }

  static async homepage(game) {
    return game.coverArt
  }
}

export default GameSerializer
