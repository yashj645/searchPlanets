import axios from 'axios'
import { serializeQueryParams } from './apiUtils'

export default {
  makeGetRequest (path, callback, params) {
    path += serializeQueryParams(params)
    axios.get(path, {withCredentials: true})
      .then(callback)
      .catch(() => {
        console.log('error')
      })
  }
}
