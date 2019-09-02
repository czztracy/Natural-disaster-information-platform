import axios from 'axios'
// import router from '@/router'
// import { Message } from 'element-ui'

const service = axios.create({
  baseURL: '',
  timeout: 60000
})

service.interceptors.request.use(
  config => {
    // const token = getToken()
    // config.headers['Authorization'] = token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error)
  }
)

export default service
