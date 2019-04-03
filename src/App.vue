<template>
  <div id="app">
    <el-header style="text-align: right" v-if="isUserAuthenticated">
    <el-row>
      <router-link :to="{name: 'exam-upload'}">
        <el-button round style="margin-right: 10px">Exam Upload</el-button>
      </router-link>
      <el-button round>DCF Messaging</el-button>
      <el-button round @click="onClickLogout">Logout</el-button>
    </el-row>
    </el-header>
    <img src="./assets/logo2.png" class="img-fluid">
    <router-view></router-view>
  </div>
</template>
<script>
import SideNavigation from "./views/utils/SideNavigation";
import {Row,Col,Container,Header,Button} from 'element-ui'
export default {
  name: 'app',
    components: {
      [Row.name]:Row,
      [Col.name]:Col,
      [Container.name]:Container,
      [Header.name]:Header,
      [Button.name]:Button,
      SideNavigation
    },
   computed:{
      isUserAuthenticated(){
          return this.$store.state.existsUser;
      }
   },
    methods:{
      onClickLogout(){
          this.$store.dispatch('onLogoutUser');
          this.$router.push('/');
      }
    }
}
</script>
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-header{
  color: #333;
  text-align: center;
  line-height: 60px;
  margin-bottom: 20px;
}
</style>
