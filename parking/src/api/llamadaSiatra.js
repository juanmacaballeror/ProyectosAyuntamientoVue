import request from '@/utils/request'

export function llamadaSiatra() {
  return request({
    url: '/llamadaSiatra',
    method: 'get'
  })
}

/*
  cuando funcionen los servicios habra que implementar la llamada, mientras tiramos del mock
export function llamadaSiatra(params) {
  return request({
    url: '/updateSiatra',
    method: 'get',
    params
  })
}*/
