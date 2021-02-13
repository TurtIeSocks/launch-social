class UserSerializer {
  static async getOne(user) {
    const allowedAttributes = ["id", "username", "profileUrl", "avatarUrl"]
    let serializedUser = {}

    for (const attribute of allowedAttributes) {
      serializedUser[attribute] = user[attribute]
    }

    return serializedUser
  }
  static async getAll(users) {
    return await Promise.all(users.map(async user => {
      const serializedUser = await UserSerializer.getOne(user)
      return serializedUser
    }))
  }
}

export default UserSerializer