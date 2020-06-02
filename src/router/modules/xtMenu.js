/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/system',
  component: Layout,
  redirect: 'noRedirect',
  name: 'system',
  meta: {
    title: '系统管理',
    icon: 'documentation'
  },
  children: [
    {
      path: 'menu',
      component: () => import('@/views/system/menu'),
      name: 'menu',
      meta: { title: '菜单管理' }
    },
    {
      path: 'role',
      component: () => import('@/views/system/role'),
      name: 'role',
      meta: { title: '角色管理' }
    },
    {
      path: 'user',
      component: () => import('@/views/system/user'),
      name: 'user',
      meta: { title: '用户管理' }
    }

  ]
}
export default tableRouter
