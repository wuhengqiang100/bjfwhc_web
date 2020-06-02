import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/auditParameter/list',
    method: 'get',
    params: query
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateUseFlag(id) {
  return request({
    url: '/auditParameter/updateUseFlag',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function createAuditParameter(data) {
  return request({
    url: '/auditParameter/create',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateAuditParameter(data) {
  return request({
    url: '/auditParameter/update',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function deleteAuditParameter(data) {
  return request({
    url: '/auditParameter/delete',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
