import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/nodejs/login',
    method: 'post',
    data: 'action=signIn&whereJson=' + JSON.stringify({ username: username, password: password })
  })
}

export function getInfo(state) {
  return request({
    url: '/nodejs/userList' + '?action=findData&whereJson=' + JSON.stringify({ user_name: state.UserName}) + '&token=' + state.token,
    method: 'get'
  })
}

export function logout(state) {
  return request({
    url: '/nodejs/login',
    method: 'post',
    data: 'action=signOut&token=' + state.token
  })
}

export function signup(username, password) {
  return request({
    url: '/nodejs/login',
    method: 'post',
    data: 'action=signUp&dataArr=' + JSON.stringify([{ username: username, password: password }])
  })
}
