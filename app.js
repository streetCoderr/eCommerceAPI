require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.status(200).send("<h3>Let's build an E-Commerce API. Ready???</h3>");
})

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`server listening at http://localhost:${PORT}`)
    })
  } catch(err) {
    console.log(err)
  }
}
start()