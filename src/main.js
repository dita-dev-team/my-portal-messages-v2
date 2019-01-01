import Vue from 'vue'
import VueLogger from 'vuejs-logger'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import {store} from './store'
import {sync} from 'vuex-router-sync'
import connectFirebase from './utils/firebase'
import * as firebase from 'firebase';
import VueSession from 'vue-session';
import SideNavigation from './views/utils/SideNavigation'

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
Vue.component('side-nav',SideNavigation);
Vue.use(VueLogger, loggerOptions);
Vue.use(VueSession);
sync(store,router)
new Vue({
  router,
  store,
  render: h => h(App),
  async created(){
    connectFirebase();
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        //Set user uid
          this.$store.dispatch('autoSignIn',user);
          Vue.$log.info(user)
      }
    });
  }
}).$mount('#app')
