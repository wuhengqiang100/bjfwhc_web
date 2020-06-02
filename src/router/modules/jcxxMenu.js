/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/base',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Base',
  meta: {
    title: '基础信息配置',
    icon: 'table'
  },
  children: [
    {
      path: 'product',
      component: () => import('@/views/base/product'),
      name: 'product',
      meta: { title: '产品信息管理' }
    },
    {
      path: 'operation',
      component: () => import('@/views/base/operation'),
      name: 'operation',
      meta: { title: '工序信息管理' }
    },
    {
      path: 'machine',
      component: () => import('@/views/base/machine'),
      name: 'machine',
      meta: { title: '设备信息管理' }
    }
  ]
}
export default tableRouter
