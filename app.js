require('dotenv').config();
require('express-async-errors');

// express
const express = require('express');
const app = express();

// relevant middlewares
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const fileUpload = require("express-fileupload")

// security packages
const cors = require("cors")
const xss = require("xss-clean")
const helmet = require("helmet")
const rateLimiter = require("express-rate-limiter")
const sanitizeMongo = require("express-mongo-sanitize")

// routers
const { authRouter, usersRouter, productsRouter, reviewsRouter, ordersRouter } = require('./routes');

// db
const connectDB = require('./db/connect');

// custom middlewares
const { notFound, errorHandler, authenticator } = require('./middlewares')

const PORT = process.env.PORT || 3000

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(sanitizeMongo());

app.use(express.json())
app.use(morgan('tiny'))
app.use(cookieParser(process.env.JWT_SECRET_KEY))
app.use(express.static('./public'))
app.use(fileUpload())

app.get('/', (req, res) => {
  res.status(200).send("<h3>Let's build an E-Commerce API. Shall we???</h3>");
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticator, usersRouter);
app.use('/api/v1/products', authenticator, productsRouter);
app.use('/api/v1/reviews', reviewsRouter);
app.use('/api/v1/orders', authenticator, ordersRouter);



app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server listening at http://localhost:${PORT}`)
    })
  } catch(err) {
    console.log(err)
  }
}
start()