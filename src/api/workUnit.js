import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/workUnit/list',
    method: 'get',
    params: query
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function createWorkUnit(data) {
  return request({
    url: '/workUnit/create',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateWorkUnit(data) {
  return request({
    url: '/workUnit/update',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function deleteWorkUnit(id) {
  return request({
    url: '/workUnit/delete',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function updateUseFlag(id) {
  return request({
    url: '/workUnit/updateUseFlag',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}
