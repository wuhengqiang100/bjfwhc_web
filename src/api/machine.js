import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/machine/list',
    method: 'get',
    params: query
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function fetchMachineTypeList() {
  return request({
    url: '/machineType/listOption',
    method: 'get'
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateUseFlag(id) {
  return request({
    url: '/machine/updateUseFlag',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function upload(forData) {
  return request({
    url: '/machine/template/upload',
    method: 'post',
    data: forData,
    // baseURL: "http://127.0.0.1:8088",
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function download(id, tokenId) {
  return request({
    url: '/machine/template/download',
    method: 'post',
    // baseURL: "http://127.0.0.1:8088",
    params: { id, tokenId }
    // responseType: 'blob'
  })
}

export function fetchMachine(id) {
  return request({
    url: '/machine/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/machine/pv',
    method: 'get',
    params: { pv }
  })
}

export function createMachine(data) {
  return request({
    url: '/machine/create',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function updateMachine(data) {
  return request({
    url: '/machine/update',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function deleteMachine(id) {
  return request({
    url: '/machine/delete',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}
