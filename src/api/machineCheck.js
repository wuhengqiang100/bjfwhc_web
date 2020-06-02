import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/machine/check',
    method: 'get'
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function updateMachineCheck(data) {
  return request({
    url: '/machine/check/save',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function fetchMachineTypeList() {
  return request({
    url: '/machine/checkType/listOption',
    method: 'get'
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateUseFlag(id) {
  return request({
    url: '/machine/check/updateUseFlag',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function fetchMachine(id) {
  return request({
    url: '/machine/check/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/machine/check/pv',
    method: 'get',
    params: { pv }
  })
}

export function createMachine(data) {
  return request({
    url: '/machine/check/create',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateMachine(data) {
  return request({
    url: '/machine/check/update',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function deleteMachine(id) {
  return request({
    url: '/machine/check/delete',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}
