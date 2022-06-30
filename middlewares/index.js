const notFound = require('./not_found_mw');
const errorHandler = require('./error_handler_mw')
const authenticator = require('./authentication_mw')
const authorizer = require('./authorization_mw')

module.exports = {
  notFound,
  errorHandler,
  authenticator,
  authorizer
}