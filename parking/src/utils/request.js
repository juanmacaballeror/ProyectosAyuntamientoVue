import axios from 'axios'
import { Message, Notification } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// Create an axios instance
const service = axios.create({
  // api-base_url
  baseURL: process.env.BASE_API,
  // Request timeout
  timeout: 15000
})

// request interceptor
service.interceptors.request.use(config => {
  // add head to call backend
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  config.headers['Content-Type'] = 'application/json'

  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer ' + getToken()
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(
  response => {
    const data = response.data ? response.data : null
    if (response.status === 200) {
      // Request the successful return of data can be
    } else if (response.status === 201) {
      Message.success('Added successfully')
    } else if (response.status === 204) {
      Message.success('Successful operation')
    } else {
      Message.success('request is successful')
    }
    return Promise.resolve(data)
  },
  error => {
    if (error.response.status === 401) {
      Message.error('401-Authentication failed')
    } else if (error.response.status === 403) {
      Message.error('403-Beyond the scope of authority')
    } else if (error.response.status === 404) {
      Message.error('404-Not found')
    } else if (error.response.status === 422) {
      const messages = [...Object.values(error.response.data.errors)]
      messages.forEach((item, index) => {
        Notification({
          title: 'Parameter error',
          message: item.join(''),
          type: 'error',
          offset: 80 * index
        })
      })
    } else if (error.response.status === 500) {
      Message.error('500-Unknown server error')
    } else {
      Message.error('unknown mistake')
    }
    return Promise.reject(error)
  }
)

export default service
