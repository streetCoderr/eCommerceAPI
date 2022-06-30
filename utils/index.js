const generateTokenUser = require('./generate_token_user')
const { generateJWT, addCookieToResponse, decodeTOken } = require('./token')

module.exports = {
  generateTokenUser,
  generateJWT,
  addCookieToResponse,
  decodeTOken
}