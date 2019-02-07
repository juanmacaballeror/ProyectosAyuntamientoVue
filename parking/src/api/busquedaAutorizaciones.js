import request from '@/utils/request'

export function getAutorizaciones() {
  return request({
    url: '/getAutorizaciones',
    method: 'get'
  })
}

/*
  cuando funcionen los servicios habra que implementar la llamada, mientras tiramos del mock
export function getautorizaciones(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}*/
