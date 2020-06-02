import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/role/list',
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
    url: '/role/updateUseFlag',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function createRole(data) {
  return request({
    url: '/role/create',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateRole(data) {
  return request({
    url: '/role/update',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function deleteRole(id) {
  return request({
    url: '/role/delete',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function updateRolePermission(data) {
  return request({
    url: '/role/permission',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
