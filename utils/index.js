const generateTokenUser = require('./generate_token_user')
const { generateJWT, addCookieToResponse, decodeTOken } = require('./token')
const checkPermission = require("./check_permission")
const sendVerificationMail = require("./send_verification_mail")
module.exports = {
  generateTokenUser,
  generateJWT,
  addCookieToResponse,
  decodeTOken,
  checkPermission,
  sendVerificationMail
}