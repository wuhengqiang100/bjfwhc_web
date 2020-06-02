import request from '@/utils/request'

// 设备日志查询
export function fetchMachineList(data) {
  return request({
    url: '/log/machine',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
// 系统日志日志查询
export function fetchSytemList(data) {
  return request({
    url: '/log/system',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
// 生产日志查询
export function fetchProduceList(data) {
  return request({
    url: '/log/produce',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

// 上传日志查询
export function fetchDataUpList(data) {
  return request({
    url: '/log/dataup',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
// 操作日志查询
export function fetchOperationList(data) {
  return request({
    url: '/log/operation',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

// 核查综合查询
export function fetchCheckQueryList(data) {
  return request({
    url: '/log/CheckQuery',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function listOption() {
  return request({
    url: '/log/listOption',
    method: 'post'
    // baseURL: "http://127.0.0.1:8088"
  })
}
