const generateTokenUser = require('./generate_token_user')
const { generateJWT, addCookieToResponse, decodeTOken } = require('./token')
const checkPermission = require("./check_permission")
module.exports = {
  generateTokenUser,
  generateJWT,
  addCookieToResponse,
  decodeTOken,
  checkPermission
}