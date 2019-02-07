import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/auth/login',
    method: 'post',
    headers: {
      'Cache-Control': 'no-cache'
    },
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/me',
    method: 'get'
  })
}
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
