import apiCall from './apiUtils/makeApiCall.js'

export default {
  getPlanetList (callback, params) {
    let path = 'http://localhost:3000/planets'
    apiCall.makeGetRequest(path, callback, params)
  },
  getShapes (callback) {
    let path = 'http://localhost:3000/shapes'
    apiCall.makeGetRequest(path, callback)
  },
  getColors (callback) {
    let path = 'http://localhost:3000/colors'
    apiCall.makeGetRequest(path, callback)
  },
  getSizes (callback) {
    let path = 'http://localhost:3000/sizes'
    apiCall.makeGetRequest(path, callback)
  }
}