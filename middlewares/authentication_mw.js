require('dotenv').config()
const { UnauthenticatedError } = require('../errors')
const {decodeTOken} = require('../utils')

const authenticator = (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) 
    throw new UnauthenticatedError("Authentication failed. Token not found")
  try {
    const user = decodeTOken(token)
    req.user = user
    next()
  } catch (err) {
    throw new UnauthenticatedError("Authentication failed. Invalid token")
  }
}


module.exports = authenticator