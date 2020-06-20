const auth = require('../../../auth')
const response = require('../../../network/response')

module.exports = checkAuth = (action) => {
  const middleware = (req, res, next) => {
    console.log('action', action)
    switch(action) {
      case 'update': 
        let owner = req.body.id
        auth.check.own(req, owner)
        next()
        break
      case 'follow': 
        auth.check.logged(req)
        next()
        break
      default: next()
    }
  }

  return middleware
}