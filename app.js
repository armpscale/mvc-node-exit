const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
const route = require('./routes/route')
/**
 * configure app
 */
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

/**
 * use middleware
 */

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(express.static(__dirname + '/views'))

/**
 * mongoose connect
 */
mongoose.connect(
  'mongodb://' + process.env.MONGODB_LOCAL + '/' + process.env.MONGODB_DATABASE,
  {
    useNewUrlParser: true
  }
)
/**
 * define Routers
 */
app.use('/', route)
/**
 * listen connected
 */
app.listen(process.env.PORT, () => {
  console.log('Server connection on port : ' + process.env.PORT)
})
