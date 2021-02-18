const Model = require('../Model.js')

class GameGenre extends Model {
  static get tableName() {
    return 'gameGenres'
  }

  static get relationMappings() {
    const { Game, Genre } = require('../index.js')

    return {
      game: {
        relation: Model.BelongsToOneRelation,
        modelClass: Game,
        join: {
          from: 'gameGenres.gameId',
          to: 'games.id'
        }
      },
      genre: {
        relation: Model.BelongsToOneRelation,
        modelClass: Genre,
        join: {
          from: 'gameGenres.genreId',
          to: 'genres.id'
        }
      }
    }
  }
}

module.exports = GameGenre