const express = require('express')
const morgan = require('morgan');
const morganBody = require('morgan-body');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const router = require('./routes')
const PORT = 8080

const uri = 'mongodb://localhost:27017/auth'
mongoose.connect(uri)

app.use(bodyParser.json())
app.use(morgan(`API Request (port ${PORT}): :method :url :status :response-time ms - :res[content-length]`));
morganBody(app);

app.use(router)

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
