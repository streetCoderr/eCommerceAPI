require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const connectDB = require('./db/connect');

const { notFoundMW, errorHandlerMW } = require('./middlewares')

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.status(200).send("<h3>Let's build an E-Commerce API. Ready???</h3>");
})

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