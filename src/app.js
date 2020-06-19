const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const dotenv = require('dotenv-safe')
dotenv.config()

const { cors } = require('./middlewares')

const mediaRouter = require('./routes/media')

const app = express()
const port = process.env.PORT || 3001

app.use(helmet())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors)

app.use('/api', mediaRouter)

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})
