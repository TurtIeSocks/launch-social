import { User } from "../../models/index.js"

class UserSeeder {
  static async seed() {

    await User.query().insert({ githubId: 11111, username: 'Admin', accessToken: '55555555', profileUrl: 'https://www.github.com/admin', avatarUrl: 'https://www.clipartmax.com/png/middle/319-3191274_male-avatar-admin-profile.png' })

    await User.query().insert({ githubId: 22222, username: 'Derick', accessToken: '55555555', profileUrl: 'https://www.github.com/admin', avatarUrl: 'https://cdn.dribbble.com/users/2582763/screenshots/10711217/kutyakok-02.jpg' })

    await User.query().insert({ githubId: 33333, username: 'Hannah', accessToken: '55555555', profileUrl: 'https://www.github.com/admin', avatarUrl: 'https://cdn4.iconfinder.com/data/icons/animal-2-1/100/animal-15-512.png' })

    await User.query().insert({ githubId: 44444, username: 'Moon', accessToken: '55555555', profileUrl: 'https://www.github.com/admin', avatarUrl: 'https://previews.123rf.com/images/lar01joka/lar01joka1804/lar01joka180400019/100152648-cute-shiba-inu-dog-avatar.jpg' })

    await User.query().insert({ githubId: 55555, username: 'David', accessToken: '55555555', profileUrl: 'https://www.github.com/admin', avatarUrl: 'https://comps.canstockphoto.com/german-shepherd-dog-avatar-vector-clipart_csp56804401.jpg' })

    await User.query().insert({ githubId: 66666, username: 'Torey', accessToken: '55555555', profileUrl: 'https://www.github.com/admin', avatarUrl: 'https://www.pngkey.com/png/detail/519-5195032_png-file-svg-dog-face-vector-png.png' })

    await User.query().insert({ githubId: 77777, username: 'Stefan', accessToken: '55555555', profileUrl: 'https://www.github.com/admin', avatarUrl: 'https://comps.canstockphoto.com/german-shepherd-dog-avatar-vector-clipart_csp56804401.jpg' })

    await User.query().insert({ githubId: 88888, username: 'Maryanna', accessToken: '55555555', profileUrl: 'https://www.github.com/admin', avatarUrl: 'https://smallimg.pngkey.com/png/small/113-1135057_dog-face-vector-dog-face-clip-art-black.png' })

    await User.query().insert({ githubId: 99999, username: 'Kat', accessToken: '55555555', profileUrl: 'https://www.github.com/admin', avatarUrl: 'https://www.clipartmax.com/png/middle/102-1025488_dog-face-vector-dog-face-icon.png' })

    await User.query().insert({ githubId: 12345, username: 'nwalberts', accessToken: '55555555', profileUrl: 'https://github.com/nwalberts', avatarUrl: 'https://avatars.githubusercontent.com/u/16418059?s=460&u=6d3d0424b2b8173bd3db3b1dce1477ceec548cfd&v=4' })

    await User.query().insert({ githubId: 67890, username: 'Alex', accessToken: '55555555', profileUrl: 'https://www.github.com/admin', avatarUrl: 'https://ca.slack-edge.com/T01C1NH2KAR-U01CHUK3N5P-be12fc001ce2-512' })

    await User.query().insert({ githubId: 23456, username: 'dovakeen118', accessToken: '55555555', profileUrl: 'https://github.com/dovakeen118', avatarUrl: 'https://avatars.githubusercontent.com/u/51170326?s=400&u=16cf3d7b6cc59ab4a4830b6caf91ab67451eeddf&v=4' })

    await User.query().insert({ githubId: 78901, username: 'safang99', accessToken: '55555555', profileUrl: 'https://github.com/safang99', avatarUrl: 'https://avatars.githubusercontent.com/u/49320339?s=400&u=5d039e217db0695c2de8c340727ccfa9d56782c0&v=4' })

    await User.query().insert({ githubId: 34567, username: 'bkincart', accessToken: '55555555', profileUrl: 'https://github.com/bkincart', avatarUrl: 'https://avatars.githubusercontent.com/u/22803185?s=400&u=565accb1911a9624f4761011b9f705ecdf87fd70&v=4' })

  }
}

export default UserSeeder
