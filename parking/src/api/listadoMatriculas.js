import request from '@/utils/request'

export function listadoMatriculas() {
  return request({
    url: '/listadoMatriculas',
    method: 'get'
  })
}

/*
  cuando funcionen los servicios habra que implementar la llamada, mientras tiramos del mock
export function listadoMatriculas(params) {
  return request({
    url: '/listadoMatriculas',
    method: 'get',
    params
  })
}*/
