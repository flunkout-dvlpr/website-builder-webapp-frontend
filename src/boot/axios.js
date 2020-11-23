import Vue from 'vue'
import axios from 'axios'

if (process.env.PROD) {
  axios.defaults.baseURL = 'PROD API'
} else {
  axios.defaults.baseURL = 'http://localhost:3000/'
}

Vue.prototype.$axios = axios
