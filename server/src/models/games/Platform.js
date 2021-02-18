const Model = require('../Model.js')

class Platform extends Model {
  static get tableName() {
    return 'platforms'
  }

  static get relationMappings() {
    const { Game } = require('../index.js')

    return {
      games: {
        relation: Model.ManyToManyRelation,
        modelClass: Game,
        join: {
          from: 'platforms.id',
          through: {
            from: 'gamePlatforms.platformId',
            to: 'gamePlatforms.gameId'
          },
          to: 'games.id'
        }
      }
    }
  }
}

module.exports = Platform