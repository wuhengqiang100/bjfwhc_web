import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/machine/machineModel/list',
    method: 'get',
    params: query
  })
}

/* export function listOption() {
  return request({
    url: '/log/listOption',
    method: 'post'
    // baseURL: "http://127.0.0.1:8088"
  })
} */

export function upload(forData) {
  return request({
    url: '/machine/machineModel/upload',
    method: 'post',
    data: forData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function download(id, tokenId) {
  return request({
    url: '/machine/machineModel/download',
    method: 'post',
    params: { id, tokenId }
    // responseType: 'blob'
  })
}

export function createMachineModel(data) {
  return request({
    url: '/machine/machineModel/create',
    method: 'post',
    data
  })
}

export function updateMachineModel(data) {
  return request({
    url: '/machine/machineModel/update',
    method: 'post',
    data
  })
}
export function deleteMachineModel(id) {
  return request({
    url: '/machine/machineModel/delete',
    method: 'post',
    params: { id }
  })
}

export function updateUseFlag(id) {
  return request({
    url: '/machine/machineModel/updateUseFlag',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}
