import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/operator/list',
    method: 'get',
    params: query
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function fetchOperatorTypeList() {
  return request({
    url: '/operator/listOption',
    method: 'get'
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateUseFlag(id) {
  return request({
    url: '/operator/updateUseFlag',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function fetchOperator(id) {
  return request({
    url: '/operator/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/operator/pv',
    method: 'get',
    params: { pv }
  })
}

export function createOperator(data) {
  return request({
    url: '/operator/create',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateOperator(data) {
  return request({
    url: '/operator/update',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function deleteOperator(id) {
  return request({
    url: '/operator/delete',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}
