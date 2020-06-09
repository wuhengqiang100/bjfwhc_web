import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/machineWarning/list',
    method: 'get',
    params: query
    // baseURL: "http://127.0.0.1:8088"
  })
}

export function dealMachineWarning(id) {
  return request({
    url: '/machineWarning/deal',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}
