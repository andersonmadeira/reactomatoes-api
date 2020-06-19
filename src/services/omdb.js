const axios = require('axios')

const API_KEY_PARAM = `apikey=${process.env.OMDB_API_KEY}`

const api = axios.create({
  baseURL: `https://www.omdbapi.com`,
})

function wasRequestSuccessful(response) {
  return response.data.Response === 'True'
}

function fetchMediaByTitle(title) {
  return new Promise((resolve, reject) => {
    return api
      .get(`/?s=${title}&${API_KEY_PARAM}`)
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

function fetchMediaById(id) {
  return new Promise((resolve, reject) => {
    return api
      .get(`/?plot=full&i=${id}&${API_KEY_PARAM}`)
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
  fetchMediaByTitle,
  fetchMediaById,
}
