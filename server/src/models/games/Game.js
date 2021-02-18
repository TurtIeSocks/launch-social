const Model = require('../Model.js')

class Game extends Model {
  static get tableName() {
    return 'games'
  }

  static get relationMappings() {
    const { Event, GameImage, GameVideo, GamePlatform, Platform, GameGenre, Genre } = require('../index.js')

    return {
      events: {
        relation: Model.HasManyRelation,
        modelClass: Event,
        join: {
          from: 'games.id',
          to: 'events.gameId'
        }
      },
      gameImages: {
        relation: Model.HasManyRelation,
        modelClass: GameImage,
        join: {
          from: 'games.id',
          to: 'gameImages.gameId'
        }
      },
      gameVideos: {
        relation: Model.HasManyRelation,
        modelClass: GameVideo,
        join: {
          from: 'games.id',
          to: 'gameVideos.gameId'
        }
      },
      gamePlatforms: {
        relation: Model.ManyToManyRelation,
        modelClass: Platform,
        join: {
          from: 'games.id',
          through: {
            from: 'gamePlatforms.gameId',
            to: 'gamePlatforms.platformId'
          },
          to: 'platforms.id'
        }
      },
      gameGenres: {
        relation: Model.ManyToManyRelation,
        modelClass: Genre,
        join: {
          from: 'games.id',
          through: {
            from: 'gameGenres.gameId',
            to: 'gameGenres.genreId'
          },
          to: 'genres.id'
        }
      }
    }
  }
}

module.exports = Game