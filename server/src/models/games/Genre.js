const Model = require('../Model.js')

class Genre extends Model {
  static get tableName() {
    return 'genres'
  }

  static get relationMappings() {
    const { Game } = require('../index.js')

    return {
      games: {
        relation: Model.ManyToManyRelation,
        modelClass: Game,
        join: {
          from: 'genres.id',
          through : {
            from: 'gameGenres.genreId',
            to: 'gameGenres.gameId'
          },
          to: 'games.id'
        }
      }
    }
  }
}

module.exports = Genre