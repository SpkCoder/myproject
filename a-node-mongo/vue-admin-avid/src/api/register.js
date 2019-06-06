import request from '@/utils/request'

export function findData(params) {
  return request({
    url: '/nodejs/check' + '?' + params,
    method: 'get'
  })
}

export function insertData(params) {
  return request({
    url: '/nodejs/check',
    method: 'post',
    data: params
  })
}

export function updateData(params) {
  return request({
    url: '/nodejs/check',
    method: 'post',
    data: params
  })
}


export function delData(params) {
  return request({
    url: '/nodejs/check',
    method: 'post',
    data: params
  })
}

