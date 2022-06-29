require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_LIFE_TIME
  })
}
// const decodeTOken = (token) => {
//   return jwt.verify(token, process.env.JWT_SECRET_KEY)
// }
const addCookieToResponse = ({res, user}) => {
  const token = generateJWT(user);
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  })
}

module.exports = {
  generateJWT, addCookieToResponse
}