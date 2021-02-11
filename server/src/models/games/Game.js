const Model = require('../Model.js')

class Game extends Model {
  static get tableName() {
    return 'games'
  }

  static get relationMappings() {
    const { Event } = require('../index.js')

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
        modelClass: Event,
        join: {
          from: 'games.id',
          to: 'gameImages.gameId'
        }
      },
      gameVideos: {
        relation: Model.HasManyRelation,
        modelClass: Event,
        join: {
          from: 'games.id',
          to: 'gameVideos.gameId'
        }
      },
      gamePlatforms: {
        relation: Model.HasManyRelation,
        modelClass: Event,
        join: {
          from: 'games.id',
          to: 'gamePlatforms.gameId'
        }
      }
    }
  }
}

module.exports = Game