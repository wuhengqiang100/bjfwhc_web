import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/deviceType/list',
    method: 'get',
    params: query
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function fetchMachineTypeList() {
  return request({
    url: '/deviceType/listOption',
    method: 'get'
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateUseFlag(id) {
  return request({
    url: '/deviceType/updateUseFlag',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function fetchDeviceType(id) {
  return request({
    url: '/deviceType/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/deviceType/pv',
    method: 'get',
    params: { pv }
  })
}

export function createDeviceType(data) {
  return request({
    url: '/deviceType/create',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateDeviceType(data) {
  return request({
    url: '/deviceType/update',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
