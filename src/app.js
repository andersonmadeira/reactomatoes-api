const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')
const dotenv = require('dotenv-safe')
dotenv.config({
  allowEmptyValues: true,
})

const { cors } = require('./middlewares')

const moviesRouter = require('./routes/movies')

const app = express()
const port = process.env.PORT || 3001

app.use(helmet())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors)
app.use(
  rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS,
    max: process.env.RATE_LIMIT_MAX,
  })
)

app.use('/api/v1/movies', moviesRouter)

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
