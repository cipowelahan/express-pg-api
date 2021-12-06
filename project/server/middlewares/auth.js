const auth = {
  isLoggedIn: (req, res, next) => {
    return typeof req.session.user === 'undefined' ? res.redirect('/auth/login') : next()
  },
  isGuest: (req, res, next) => {
    return typeof req.session.user === 'undefined' ? next() : res.redirect('/dashboard')
  }
}

module.exports = auth