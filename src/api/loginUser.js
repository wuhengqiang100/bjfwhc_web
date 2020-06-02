import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/loginUser/list',
    method: 'get',
    params: query
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateUseFlag(id) {
  return request({
    url: '/loginUser/updateUseFlag',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function resetPassword(id) {
  return request({
    url: '/loginUser/resetPassword',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function createLoginUser(data) {
  return request({
    url: '/loginUser/create',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateLoginUser(data) {
  return request({
    url: '/loginUser/update',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function deleteLoginUser(id) {
  return request({
    url: '/loginUser/delete',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function fetchRoleList() {
  return request({
    url: '/character/listOption',
    method: 'get'
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function fetchPv(pv) {
  return request({
    url: '/loginUser/pv',
    method: 'get',
    params: { pv }
  })
}
export function fetchLoginUser(id) {
  return request({
    url: '/loginUser/detail',
    method: 'get',
    params: { id }
  })
}
export function fetchUserOwnRole(loginId) {
  return request({
    url: '/loginUser/listOwn',
    method: 'post',
    params: { loginId }
    // baseURL: "http://127.0.0.1:8088"
  })
}
