
const notFoundMW = (req, res, next) => {
  res.status(404).send('Route does not exist');
  next()
}

module.exports = notFoundMW