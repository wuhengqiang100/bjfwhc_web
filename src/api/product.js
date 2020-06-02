import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/product/list',
    method: 'get',
    params: query
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function fetchMachineTypeList() {
  return request({
    url: '/product/listOption',
    method: 'get'
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateUseFlag(id) {
  return request({
    url: '/product/updateUseFlag',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function fetchProduct(id) {
  return request({
    url: '/product/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/product/pv',
    method: 'get',
    params: { pv }
  })
}

export function createProduct(data) {
  return request({
    url: '/product/create',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateProduct(data) {
  return request({
    url: '/product/update',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function deleteProduct(id) {
  return request({
    url: '/product/delete',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}
