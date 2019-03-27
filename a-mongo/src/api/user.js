import request from '@/utils/request'

export function findData(params) {
  return request({
    url: '/nodejs/userList' + '?' + params,
    method: 'get'
  })
}


export function updateData(params) {
  return request({
    url: '/nodejs/userList',
    method: 'post',
    data: params
  })
}
