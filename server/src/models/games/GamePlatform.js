const Model = require('../Model.js')

class GamePlatform extends Model {
  static get tableName() {
    return 'gamePlatforms'
  }

  static get relationMappings() {
    const { Game } = require('../index.js')

    return {
      game: {
        relation: Model.BelongsToOneRelation,
        modelClass: Game,
        join: {
          from: 'gamePlatforms.gameId',
          to: 'games.id'
        }
      }
    }
  }
}

module.exports = GamePlatform