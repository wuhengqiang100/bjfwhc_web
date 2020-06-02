import request from '@/utils/request'

// 核查报表主视图查询
export function fetchReportMainList(data) {
  return request({
    url: '/query/reportMain',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}
// 核查报表未检视图查询
export function fetchReportNckList(data) {
  return request({
    url: '/query/reportNck',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

// 核查报表缺陷视图查询
export function fetchReportQaList(data) {
  return request({
    url: '/query/reportQa',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

