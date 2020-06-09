import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/displayPlatformInfo/list',
    method: 'get',
    params: query
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function createDisplayPlatformInfo(data) {
  return request({
    url: '/displayPlatformInfo/create',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateDisplayPlatformInfo(data) {
  return request({
    url: '/displayPlatformInfo/update',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function deleteDisplayPlatformInfo(id) {
  return request({
    url: '/displayPlatformInfo/delete',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function updateUseFlag(id) {
  return request({
    url: '/displayPlatformInfo/updateUseFlag',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}

