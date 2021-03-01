import UserSerializer from './UserSerializer.js'

class CommentSerializer {
  static async getOne(interest) {
    const allowedAttributes = ["id", "userId", "eventId", "comment", "createdAt"]
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

      const serializedInterest = await CommentSerializer.getOne(interest)
      return serializedInterest
    }))
  }
}

export default CommentSerializer