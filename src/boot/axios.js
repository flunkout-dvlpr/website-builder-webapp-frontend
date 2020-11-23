import Vue from 'vue'
import axios from 'axios'

if (process.env.PROD) {
  axios.defaults.baseURL = 'https://d305uupefe.execute-api.us-east-2.amazonaws.com/Prod/'
} else {
  axios.defaults.baseURL = 'http://localhost:3000/'
}

Vue.prototype.$axios = axios
