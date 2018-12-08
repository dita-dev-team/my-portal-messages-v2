<template>
    <el-aside width="200px" style="background-color: rgb(238,241,246)">
       <el-menu :default-openeds="['1','3']">
           <el-submenu index="1">
               <template slot="title">My Portal Messaging</template>
           </el-submenu>
       </el-menu>
    </el-aside>
</template>
<script>
    import {Container,Aside,Menu,Submenu} from 'element-ui'
    export default{
        name:'sideNavigation',
        components:{
          [Container.name]:Container,
          [Aside.name]:Aside,
          [Menu.name]:Menu,
          [Submenu.name]:Submenu
        },
        data(){
            return {

            }
        }
    }
</script>
