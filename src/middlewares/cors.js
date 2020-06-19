const cors = require('cors')

const corsConfig = cors({
  origin: process.env.CORS_ALLOWED_ORIGIN,
  exposedHeaders: ['Authorization'],
})

module.exports.cors = corsConfig
