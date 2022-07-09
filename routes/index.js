const authRouter = require('./auth_route');
const usersRouter = require('./users_route');
const productsRouter = require('./products_route')
const reviewsRouter = require('./reviews_route')
module.exports = {
  authRouter, usersRouter, productsRouter, reviewsRouter
}