import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/operation/list',
    method: 'get',
    params: query
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function fetchOperationTypeList() {
  return request({
    url: '/operationType/listOption',
    method: 'get'
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateUseFlag(id) {
  return request({
    url: '/operation/updateUseFlag',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function fetchOperation(id) {
  return request({
    url: '/operation/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/operation/pv',
    method: 'get',
    params: { pv }
  })
}

export function createOperation(data) {
  return request({
    url: '/operation/create',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateOperation(data) {
  return request({
    url: '/operation/update',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function deleteOperation(id) {
  return request({
    url: '/operation/delete',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}
