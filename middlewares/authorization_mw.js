const {UnauthorizedError} = require('../errors')
const authorizer = (...role) => {
  return (req, res, next) => {
    //console.log(rest)
    if (!role.includes(req.user.role))
      throw new UnauthorizedError("You do not have permission to access this route")
    next()
  }
}

module.exports = authorizer