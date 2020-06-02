import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/wasterReason/list',
    method: 'get',
    params: query
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function createWasterReason(data) {
  return request({
    url: '/wasterReason/create',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateWasterReason(data) {
  return request({
    url: '/wasterReason/update',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function deleteWasterReason(id) {
  return request({
    url: '/wasterReason/delete',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function updateUseFlag(id) {
  return request({
    url: '/wasterReason/updateUseFlag',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}
