import request from '@/utils/request'

export function listOptionMachineModel() {
  return request({
    url: '/option/machineModel',
    method: 'post'
  })
}
export function listOptionAuditParameter() {
  return request({
    url: '/option/auditParameter',
    method: 'post'
  })
}
export function listOptionAuditParameterByIds(data) {
  return request({
    url: '/option/auditParameterByIds',
    method: 'post',
    data
  })
}
export function listOptionOperator() {
  return request({
    url: '/option/operator',
    method: 'post'
  })
}
export function listOptionWasterReason() {
  return request({
    url: '/option/wasterReason',
    method: 'post'
  })
}
export function listOptionProduct() {
  return request({
    url: '/option/product',
    method: 'post'
  })
}
export function listOptionWorkUnit() {
  return request({
    url: '/option/workUnit',
    method: 'post'
  })
}
export function listOptionProduceLog() {
  return request({
    url: '/option/produceLog',
    method: 'post'
  })
}

export function listOptionMachineQuery() {
  return request({
    url: '/option/machineQuery',
    method: 'post'
  })
}

export function listOptionReportMain() {
  return request({
    url: '/option/reportMain',
    method: 'post'
  })
}

export function listOptionReportNck() {
  return request({
    url: '/option/reportNck',
    method: 'post'
  })
}

export function listOptionReportQa() {
  return request({
    url: '/option/reportQa',
    method: 'post'
  })
}

