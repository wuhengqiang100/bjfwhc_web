/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/log',
  component: Layout,
  redirect: 'noRedirect',
  name: 'log',
  meta: {
    title: '核查信息管理',
    icon: 'component'
  },
  children: [

    /*   {
      path: 'dataup',
      component: () => import('@/views/log/dataup'),
      name: 'dataup',
      meta: { title: '上传日志查询' }
    },
    {
      path: 'operation',
      component: () => import('@/views/log/operation'),
      name: 'operation',
      meta: { title: '操作日志查询' }
    },
    {
      path: 'machine',
      component: () => import('@/views/log/machine'),
      name: 'machine',
      meta: { title: '设备日志查询' }
    },
    {
      path: 'produce',
      component: () => import('@/views/log/produce'),
      name: 'produce',
      meta: { title: '生产日志查询' }
    } */

  ]
}
export default tableRouter
