import request from '@/utils/request'

export function totalesParking() {
  return request({
    url: '/totalesParking',
    method: 'get'
  })
}
