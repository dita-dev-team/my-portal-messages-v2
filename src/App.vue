<template>
  <div id="app">
    <img src="./assets/logo2.png" class="img-fluid">
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'app',
  created () {
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.title !== undefined) {
        document.title = to.meta.title
      }
      let currentUser = firebase.auth().currentUser
      let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
      if (requiresAuth && !currentUser) {
        next('login')
      } else {
        next()
      }
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
