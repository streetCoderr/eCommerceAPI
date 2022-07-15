require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY)
}
const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY)
}
const addCookieToResponse = ({res, user, refreshToken}) => {
  const accessTokenJWT = generateJWT(user);
  const refreshTokenJWT = generateJWT({user, refreshToken})
  const oneDay = 1000 * 60 * 60 * 24;
  const day30 = 1000 * 60 * 60 * 24 * 30;

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  })
  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    expires: new Date(Date.now() + day30),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  })
}

module.exports = {
  generateJWT, addCookieToResponse, decodeToken
}