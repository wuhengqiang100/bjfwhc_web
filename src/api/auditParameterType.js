import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/auditParameterType/list',
    method: 'get',
    params: query
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateUseFlag(id) {
  return request({
    url: '/auditParameterType/updateUseFlag',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function createParameterType(data) {
  return request({
    url: '/auditParameterType/create',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateParameterType(data) {
  return request({
    url: '/auditParameterType/update',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function deleteParameterType(id) {
  return request({
    url: '/auditParameterType/delete',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}
