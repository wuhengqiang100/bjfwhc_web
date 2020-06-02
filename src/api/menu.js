import request from '@/utils/request'

// 获取网站菜单list
export function fetchBmenuList(data) {
  return request({
    url: '/system/bMenu/list',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
// 获取c端权限list
export function fetchCmenuList(data) {
  return request({
    url: '/system/cMenu/list',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function updateUseFlag(id) {
  return request({
    url: '/system/cMenu/updateUseFlag',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}

/* export function fetchMachine(id) {
  return request({
    url: '/system/cMenu/detail',
    method: 'get',
    params: { id }
  })
} */

export function createCmenu(data) {
  return request({
    url: '/system/cMenu/create',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateCmenu(data) {
  return request({
    url: '/system/cMenu/update',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function deleteCmenu(id) {
  return request({
    url: '/system/cMenu/delete',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}
