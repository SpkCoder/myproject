import request from '@/utils/request'

export function findData(params) {
  return request({
    url: '/nodejs/deviceList' + '?' + params,
    method: 'get'
  })
}


export function updateData(params) {
  return request({
    url: '/nodejs/deviceList',
    method: 'post',
    data: params
  })
}
