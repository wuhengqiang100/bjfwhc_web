import request from '@/utils/request'

export function fetchListCardTop(query) {
  return request({
    url: '/monitor/cardTop',
    method: 'get',
    params: query
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function fetchListCardBottom(query) {
  return request({
    url: '/monitor/cardBottom',
    method: 'get',
    params: query
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateUseFlag(id) {
  return request({
    url: '/monitor/updateUseFlag',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function createAuditParameter(data) {
  return request({
    url: '/monitor/create',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

