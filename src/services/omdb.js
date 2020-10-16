const axios = require('axios')
const querystring = require('querystring')

const defaultQueryParams = { type: 'movie', apikey: process.env.OMDB_API_KEY }

const api = axios.create({
  baseURL: `https://www.omdbapi.com`,
})

function wasRequestSuccessful(response) {
  return response.data.Response === 'True'
}

function fetchMoviesByTitle(title) {
  const queryParams = { ...defaultQueryParams, ...(title ? { s: title } : {}) }
  const strQueryParams = querystring.stringify(queryParams)

  return new Promise((resolve, reject) => {
    return api
      .get(`/?${strQueryParams}`)
      .then((response) => {
        console.log('response:', response.data)
        if (wasRequestSuccessful(response)) {
          resolve(response.data)
        } else {
          reject(response.data)
        }
      })
      .catch((err) => reject(err))
  })
}

function fetchMovieById(id) {
  const queryParams = {
    ...defaultQueryParams,
    plot: 'full',
    i: id,
  }
  const strQueryParams = querystring.stringify(queryParams)

  return new Promise((resolve, reject) => {
    return api
      .get(`/?${strQueryParams}`)
      .then((response) => {
        if (wasRequestSuccessful(response)) {
          resolve(response.data)
        } else {
          reject(response.data)
        }
      })
      .catch((err) => reject(err))
  })
}

module.exports = {
  fetchMoviesByTitle,
  fetchMovieById,
}
