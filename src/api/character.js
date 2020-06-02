import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/character/list',
    method: 'get',
    params: query
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function fetchRoleMenus() {
  return request({
    url: '/menu/listOption',
    method: 'get'
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function fetchRoleOwnMenus(roleId) {
  return request({
    url: '/menu/listOwn',
    method: 'post',
    params: { roleId }
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function updateUseFlag(id) {
  return request({
    url: '/character/updateUseFlag',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function createRole(data) {
  console.log('添加请求')
  return request({
    url: '/character/create',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateRole(data) {
  return request({
    url: '/character/update',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function deleteRole(id) {
  return request({
    url: '/character/delete',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}
