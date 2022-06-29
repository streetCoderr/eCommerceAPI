const generateTokenUser = require('./generate_token_user')
const { generateJWT, addCookieToResponse } = require('./token')

module.exports = {
  generateTokenUser,
  generateJWT,
  addCookieToResponse
}