const Model = require('../Model.js')

class GameVideo extends Model {
  static get tableName() {
    return 'gameVideos'
  }

  static get relationMappings() {
    const { Game } = require('../index.js')

    return {
      game: {
        relation: Model.BelongsToOneRelation,
        modelClass: Game,
        join: {
          from: 'gameVideos.gameId',
          to: 'games.id'
        }
      }
    }
  }
}

module.exports = GameVideo