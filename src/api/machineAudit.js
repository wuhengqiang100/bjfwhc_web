import request from '@/utils/request'

// 未审核的数据
export function fetchCanAuditList(data) {
  return request({
    url: '/machine/canAudit/list',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

// 未审核的数据
export function fetchAlreadyAuditList(data) {
  return request({
    url: '/machine/alreadyAudit/list',
    method: 'post',
    data
  })
}

// 不走核查的数据
export function fetchNotAuditList(data) {
  return request({
    url: '/machine/notAudit/list',
    method: 'post',
    data
  })
}

// 审核数据
export function saveCanAudit(data) {
  return request({
    url: '/machine/canAudit/save',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

// 回退数据
export function saveAlreadyAudit(data) {
  return request({
    url: '/machine/alreadyAudit/save',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

// 全检数据
export function saveNotAudit(data) {
  return request({
    url: '/machine/notAudit/save',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
// 全检数据
export function saveEditNoteCan(data) {
  return request({
    url: '/machine/saveNoteCan',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
// 全检数据
export function saveEditNoteAlready(data) {
  return request({
    url: '/machine/saveNoteAlready',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

// 回退全检数据
/* export function returnNotAudit(data) {
  return request({
    url: '/machine/notAudit/return',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
 */
