/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/machine',
  component: Layout,
  redirect: 'noRedirect',
  name: 'machine',
  meta: {
    title: '机检信息管理',
    icon: 'guide'
  },
  children: [
    {
      path: 'check',
      component: () => import('@/views/machine/check'),
      name: 'check',
      meta: { title: '机检信息审核' }
    },
    {
      path: 'template',
      component: () => import('@/views/machine/template'),
      name: 'template',
      meta: { title: '机检模板管理' }
    }
  ]
}
export default tableRouter
