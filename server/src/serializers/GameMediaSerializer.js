class GameMediaSerializer {

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
      const serializedImage = await GameMediaSerializer.getImage(image)
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
      const serializedVideo = await GameMediaSerializer.getVideo(video)
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
      const serializedPlatform = await GameMediaSerializer.getPlatform(platform)
      return serializedPlatform
    }))
  }

  static async getGenre(genre) {
    const allowedAttributes = ["name"]

    const serializedGenre = {}

    for (const attribute of allowedAttributes) {
      serializedGenre[attribute] = genre[attribute]
    }
    return serializedGenre
  }

  static async getAllGenres(genres) {
    return await Promise.all(genres.map(async genre => {
      const serializedGenre = await GameMediaSerializer.getGenre(genre)
      return serializedGenre
    }))
  }
}

export default GameMediaSerializer
