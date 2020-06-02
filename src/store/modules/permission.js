import { constantRoutes } from '@/router'
import Layout from '@/layout'
// import request from '@/utils/request'
import { getAsyncRoutes } from '@/api/user'
import { getToken } from '@/utils/auth' // get token from cookie

/* // eslint-disable-next-line no-unused-vars
import product from '@/views/base/product'
// eslint-disable-next-line no-unused-vars
import operation from '@/views/base/operation'
// eslint-disable-next-line no-unused-vars
import machine from '@/views/base/machine'
// eslint-disable-next-line no-unused-vars
import dataupLog from '@/views/log/dataupLog'
// eslint-disable-next-line no-unused-vars
import operationLog from '@/views/log/operationLog'
// eslint-disable-next-line no-unused-vars
import machineLog from '@/views/log/machineLog'
// eslint-disable-next-line no-unused-vars
import produceLog from '@/views/log/produceLog'
// eslint-disable-next-line no-unused-vars
import check from '@/views/machine/check'
// eslint-disable-next-line no-unused-vars
import template from '@/views/machine/template'
// eslint-disable-next-line no-unused-vars
import menu from '@/views/system/menu'
// eslint-disable-next-line no-unused-vars
import role from '@/views/system/role'
// eslint-disable-next-line no-unused-vars
import user from '@/views/system/user' */

/* export const asyncRoutes = [
  {
    path: '/base',
    component: Layout,
    redirect: 'noRedirect',
    name: 'base',
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
  },
  {
    path: '/log',
    component: Layout,
    redirect: 'noRedirect',
    name: 'log',
    meta: {
      title: '核查信息管理',
      icon: 'component'
    },
    children: [

      {
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
      }

    ]
  },
  {
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
  },
  {
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
  },
  { path: '*', redirect: '/404', hidden: true }
] */
export const asyncRoutes = [
  /*  {
    'path': '/base',
    'component': Layout,
    'redirect': 'noRedirect',
    'name': 'Base',
    'meta': {
      'title': '基础信息配置',
      'icon': 'table'
    },
    'children': [
      {
        'path': 'product',
        'component': () => import('@/views/base/product'),
        'name': 'product',
        'meta': { 'title': '产品信息管理' }
      },
      {
        'path': 'operation',
        'component': () => import('@/views/base/operation'),
        'name': 'operation',
        'meta': { 'title': '工序信息管理' }
      },
      {
        'path': 'machine',
        'component': () => import('@/views/base/machine'),
        'name': 'machine',
        'meta': { 'title': '设备信息管理' }
      }
    ]
  },
  {
    path: '/base',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Base',
    meta: {
      title: '基础信息配置',
      icon: 'table'
    },
    children: [{
      path: 'product',
      component: () => import('@/views/base/product'),
      name: 'product',
      meta: {
        title: '产品信息管理'
      }
    }, {
      path: 'operation',
      component: () => import('@/views/base/operation'),
      name: 'operation',
      meta: {
        title: '工序信息管理'
      }
    }, {
      path: 'machine',
      component: () => import('@/views/base/machine'),
      name: 'machine',
      meta: {
        title: '设备信息管理'
      }
    }]
  } */
]

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    // roles.some(role => {

    //   console.log(role)
    //   console.log(route.meta.roles)
    //   console.log(route.meta.roles.includes(role))
    // }
    // )
    // return roles.includes(route.meta.roles);
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */
export function generaMenu(routes, data) {
  data.forEach(item => {
    // alert(JSON.stringify(item))
    // const menu = ''
    const menu = {
      path: item.path,
      component:
        item.component === '#'
          ? Layout
          : () => import(`@/views${item.component}`),
      redirect: item.redirect,
      hidden: false,
      children: [],
      name: item.name,
      meta: {
        title: item.meta.title,
        icon: item.meta.icon,
        roles: [item.meta.roles]
      }
    }

    // 如果有children
    if (item.children) {
      generaMenu(menu.children, item.children)
    }
    routes.push(menu)
  })
  // 加一个404页面路由在最后
  const menu404 = {
    path: '*',
    redirect: '/404',
    hidden: true
  }
  routes.push(menu404)
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // let accessedRoutes
      const loadMenuData = []
      console.log(getToken())
      getAsyncRoutes(getToken()).then(res => {
        let data = res
        // accessedRoutes = asyncRoutes || []
        data = res.asyncRoutes || []
        Object.assign(loadMenuData, data)
        console.log(loadMenuData)
        generaMenu(asyncRoutes, loadMenuData)
        // let accessedRoutes
        // 前台控制菜单
        /*   if (roles.includes("最高权限")) {
            accessedRoutes = asyncRoutes || [];
          } else {
            accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
          } */
        // 后台控制菜单
        const accessedRoutes = asyncRoutes || []
        commit('SET_ROUTES', accessedRoutes)
        console.log(accessedRoutes)

        resolve(accessedRoutes)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
