import { User } from "../../models/index.js"

class UserSeeder {
  static async seed() {

    await User.query()
      .insert({
        githubId: '58572875',
        username: 'TurtIeSocks',
        accessToken: '776ed8afe5ca9519d72838d9cc0eccf25d037495',
        profileUrl: 'https://github.com/TurtIeSocks',
        avatarUrl: 'https://avatars.githubusercontent.com/u/58572875?v=4'
      })
  }
}

export default UserSeeder
