import Vue from 'vue'
import VueLogger from 'vuejs-logger'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import {store} from './store'
import {sync} from 'vuex-router-sync'

Vue.config.productionTip = false

const isProduction = process.env.NODE_ENV === 'production'

const loggerOptions = {
  isEnabled: true,
  logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true
}

Vue.use(VueLogger, loggerOptions)
sync(store,router)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
