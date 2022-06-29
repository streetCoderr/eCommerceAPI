require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const morgan = require('morgan');
const cookieParser = require('cookie-parser')

const { authRouter } = require('./routes');

const connectDB = require('./db/connect');

const { notFoundMW, errorHandlerMW } = require('./middlewares')

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(morgan('tiny'))
app.use(cookieParser(process.env.JWT_SECRET_KEY))

app.get('/', (req, res) => {
  res.status(200).send("<h3>Let's build an E-Commerce API. Ready???</h3>");
})

app.use('/api/v1/auth', authRouter);

app.use(notFoundMW);
app.use(errorHandlerMW);

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