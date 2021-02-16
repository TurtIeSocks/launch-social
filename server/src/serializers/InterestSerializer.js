import UserSerializer from './UserSerializer.js'
class InterestSerializer {
  static async getOne(interest) {
    const allowedAttributes = ["userId", "value"]
    let serializedInterest = {}

    for (const attribute of allowedAttributes) {
      serializedInterest[attribute] = interest[attribute]
    }
    
    const user = await interest.$relatedQuery('user')
    const serializedUser = await UserSerializer.getOne(user)
    serializedInterest = {...serializedInterest, userInfo: serializedUser }

    return serializedInterest
  }
  static async getAll(interests) {
    return await Promise.all(interests.map(async interest => {

      const serializedInterest = await InterestSerializer.getOne(interest)
      return serializedInterest
    }))
  }
}

export default InterestSerializer