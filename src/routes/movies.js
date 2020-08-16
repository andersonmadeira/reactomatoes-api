const express = require('express')
const { fetchMovieById, fetchMoviesByTitle } = require('../services/omdb')

const router = express.Router()

router.get('/', function (req, res) {
  const { search } = req.query

  fetchMoviesByTitle(search)
    .then((data) => res.send(data.Search))
    .catch((err) => {
      switch (err.Error) {
        case 'Movie not found!':
          res.status(404).send({
            message: 'Movie not found!',
          })
          break
        case 'Too many results.':
          res.status(422).send({
            message: 'Too many results.',
          })
          break
        default:
          res.status(500).send({
            message: 'Something weird happened!',
          })
      }
    })
})

router.get('/:id', function (req, res) {
  const { id } = req.params

  fetchMovieById(id)
    .then((data) => res.send(data))
    .catch((err) => {
      switch (err.Error) {
        case 'Incorrect IMDb ID.':
          res.status(404).send({
            message: 'Movie not found!'
          })
          break
        default:
          res.status(500).send({
            message: 'Something weird happened!'
          })
      }
    })
})

module.exports = router
