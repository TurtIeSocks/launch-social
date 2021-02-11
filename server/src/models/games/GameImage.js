const Model = require('../Model.js')

class GameImage extends Model {
  static get tableName() {
    return 'gameImages'
  }

  static get relationMappings() {
    const { Game } = require('../index.js')

    return {
      game: {
        relation: Model.BelongsToOneRelation,
        modelClass: Game,
        join: {
          from: 'gameImages.gameId',
          to: 'games.id'
        }
      }
    }
  }
}

module.exports = GameImage