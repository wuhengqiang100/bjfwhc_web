import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import animated from 'animate.css'

import Element from 'element-ui'

import './styles/element-variables.scss'
import './assets//bigScreen/common.less' // 大屏的less

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import dataV from '@jiaminghi/data-view'
Vue.config.productionTip = false

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}
import Button from 'ant-design-vue/lib/button'
import Table from 'ant-design-vue/lib/table'
import 'ant-design-vue/dist/antd.css'
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})
Vue.component(Button.name, Button)
Vue.component(Table.name, 	Table)

Vue.use(dataV)

Vue.use(animated)
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
