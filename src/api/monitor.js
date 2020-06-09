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

export function fetchListMachineWarning(query) {
  return request({
    url: '/monitor/warning',
    method: 'get',
    params: query
    // baseURL: "http://127.0.0.1:8088"
  })
}

