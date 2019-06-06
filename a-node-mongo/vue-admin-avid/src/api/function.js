import request from '@/utils/request'

export function findData(params) {
  return request({
    url: '/nodejs/function' + '?' + params,
    method: 'get'
  })
}

export function insertData(params) {
  return request({
    url: '/nodejs/function',
    method: 'post',
    data: params
  })
}

export function updateData(params) {
  return request({
    url: '/nodejs/function',
    method: 'post',
    data: params
  })
}


export function delData(params) {
  return request({
    url: '/nodejs/function',
    method: 'post',
    data: params
  })
}
