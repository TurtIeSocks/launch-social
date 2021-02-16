class GameSerializer {
  static async getOne(game) {
    const allowedAttributes = ["apiId","name", "summary", "maxPlayers", "coverArt", "url"]

    const serializedGame = {}

    for (const attribute of allowedAttributes) {
      serializedGame[attribute] = game[attribute]
    }

    const images = await game.$relatedQuery('gameImages')
    serializedGame.images = await GameSerializer.getAllImages(images)

    const videos = await game.$relatedQuery('gameVideos')
    serializedGame.videos = await GameSerializer.getAllVideos(videos)

    const platforms = await game.$relatedQuery('gamePlatforms')
    serializedGame.platforms = await GameSerializer.getAllPlatforms(platforms)

    return serializedGame
  }

  static async getAll(games) {
    return await Promise.all(games.map(async game => {
      const serializedGame = await GameSerializer.getOne(game)
      return serializedGame
    }))
  }

  static async getImage(image) {
    const allowedAttributes = ["imageId"]

    const serializedImages = {}

    for (const attribute of allowedAttributes) {
      serializedImages[attribute] = image[attribute]
    }
    return serializedImages
  }

  static async getAllImages(images) {
    return await Promise.all(images.map(async image => {
      const serializedImage = await GameSerializer.getImage(image)
      return serializedImage
    }))
  }

  static async getVideo(video) {
    const allowedAttributes = ["videoId"]

    const serializedVideo = {}

    for (const attribute of allowedAttributes) {
      serializedVideo[attribute] = video[attribute]
    }
    return serializedVideo
  }

  static async getAllVideos(videos) {
    return await Promise.all(videos.map(async video => {
      const serializedVideo = await GameSerializer.getVideo(video)
      return serializedVideo
    }))
  }

  static async getPlatform(platform) {
    const allowedAttributes = ["name", "imageId"]
    
    const serializedPlatform = {}

    for (const attribute of allowedAttributes) {
      serializedPlatform[attribute] = platform[attribute]
    }
    return serializedPlatform
  }

  static async getAllPlatforms(platforms) {
    return await Promise.all(platforms.map(async platform => {
      const serializedPlatform = await GameSerializer.getPlatform(platform)
      return serializedPlatform
    }))
  }

}

export default GameSerializer
