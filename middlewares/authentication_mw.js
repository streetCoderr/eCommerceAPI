require("dotenv").config();
const { UnauthenticatedError } = require("../errors");
const { decodeToken, addCookieToResponse } = require("../utils");
const Token = require("../models/token");

const authenticator = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;
  try {
    if (accessToken) {
      const payload = decodeToken(accessToken);
      req.user = payload;
      return next();
    }
    const payload = decodeToken(refreshToken);
    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });
    if (!existingToken || !existingToken.isValid)
      throw new UnauthenticatedError("Authentication failed");
    addCookieToResponse({
      res,
      user: payload.user,
      refreshToken: payload.refreshToken,
    });
    req.user = payload.user;
    next();
  } catch (err) {
    throw new UnauthenticatedError("Authentication failed. Invalid token");
  }
};

module.exports = authenticator;
