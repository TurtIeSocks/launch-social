import { Strategy as GitHubStrategy } from 'passport-github2'
import { User } from "../models/index.js";
import configuration from "../config.js";

const authHandler = async (accessToken, refreshToken, profile, done) => {
  const { id, username, profileUrl, photos } = profile
  
  await User.query()
    .findOne({ githubId: id })
    .then( async (user) => {
      if (!user) {
        user = await User.query()
          .insert({ githubId: id, username, accessToken, profileUrl, avatarUrl: photos[0].value })
          .returning('*')
        return done(null, user)
      } else {
        return done(null, user)
      }
    })
}

export default new GitHubStrategy({
  clientID: configuration.clientId,
  clientSecret: configuration.clientSecret,
  callbackURL: configuration.gitHubCallBackUrl
}, authHandler)
