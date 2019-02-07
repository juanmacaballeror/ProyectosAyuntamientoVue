import request from '@/utils/request'

export function getTipoVia() {
  return request({
    url: '/tipoVia',
    method: 'get'

  })
}

/* para cuando funcionen los servicios
export function getLocalidad(params) {
  return request({
    url: '/localidad',
    method: 'get',
    params

  })
}*/

export function getLocalidad() {
  return request({
    url: '/localidad',
    method: 'get'
  })
}

export function getProvincia() {
  return request({
    url: '/provincia',
    method: 'get'

  })
}

export function getcanalComunicaciones() {
  return request({
    url: '/canalComunicaciones',
    method: 'get'

  })
}

export function getTipoDocumento() {
  return request({
    url: '/tipoDocumento',
    method: 'get'

  })
}
