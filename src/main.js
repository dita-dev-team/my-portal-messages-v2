import Vue from 'vue'
import VueLogger from 'vuejs-logger'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
