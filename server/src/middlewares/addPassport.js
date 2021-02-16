import passport from "passport"
import strategy from "../authentication/passportStrategyGithub.js"
import deserializeUser from "..//authentication/deserializeUser.js"

const addPassport = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())
  app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }),
    function (req, res) {
    })

  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    function (req, res) {
      res.redirect('/')
    })

  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })
}

passport.use(strategy)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(deserializeUser)

export default addPassport
