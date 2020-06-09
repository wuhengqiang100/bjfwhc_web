import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/displayPlatform/list',
    method: 'get',
    params: query
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function createDisplayPlatform(data) {
  return request({
    url: '/displayPlatform/create',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateDisplayPlatform(data) {
  return request({
    url: '/displayPlatform/update',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function deleteDisplayPlatform(id) {
  return request({
    url: '/displayPlatform/delete',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateUseFlag(id) {
  return request({
    url: '/displayPlatform/updateUseFlag',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}
