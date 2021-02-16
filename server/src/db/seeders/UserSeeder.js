import { User } from "../../models/index.js"

class UserSeeder {
  static async seed() {

    await User.query().insert({ githubId: 11111, username: 'Admin', accessToken: '55555555', profileUrl: 'https://www.github.com/admin', avatarUrl: 'https://www.clipartmax.com/png/middle/319-3191274_male-avatar-admin-profile.png' })

    await User.query().insert({ githubId: 22222, username: 'Derick', accessToken: '55555555', profileUrl: 'https://www.github.com/admin', avatarUrl: 'https://cdn.dribbble.com/users/2582763/screenshots/10711217/kutyakok-02.jpg' })

    await User.query().insert({ githubId: 33333, username: 'Hannah', accessToken: '55555555', profileUrl: 'https://www.github.com/admin', avatarUrl: 'https://cdn4.iconfinder.com/data/icons/animal-2-1/100/animal-15-512.png' })

    await User.query().insert({ githubId: 44444, username: 'Moon', accessToken: '55555555', profileUrl: 'https://www.github.com/admin', avatarUrl: 'https://previews.123rf.com/images/lar01joka/lar01joka1804/lar01joka180400019/100152648-cute-shiba-inu-dog-avatar.jpg' })

    await User.query().insert({ githubId: 55555, username: 'David', accessToken: '55555555', profileUrl: 'https://www.github.com/admin', avatarUrl: 'https://comps.canstockphoto.com/german-shepherd-dog-avatar-vector-clipart_csp56804401.jpg' })

  }
}

export default UserSeeder
