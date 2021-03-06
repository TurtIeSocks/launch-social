const Model = require('../Model.js')

class GamePlatform extends Model {
  static get tableName() {
    return 'gamePlatforms'
  }

  static get relationMappings() {
    const { Game, Platform } = require('../index.js')

    return {
      game: {
        relation: Model.BelongsToOneRelation,
        modelClass: Game,
        join: {
          from: 'gamePlatforms.gameId',
          to: 'games.id'
        }
      },
      platform: {
        relation: Model.BelongsToOneRelation,
        modelClass: Platform,
        join: {
          from: 'gamePlatforms.platformId',
          to: 'platforms.id'
        }
      }
    }
  }
}

module.exports = GamePlatform