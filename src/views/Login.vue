<template>
  <el-container direction="vertical">
    <el-row>
      <el-col :span="12" :offset="6">
        <el-form :model="loginForm" ref="loginForm" >
          <el-form-item
            prop="email"
            label="Email"
            :rules="[
              { required: true, message: 'This field is required', trigger: 'blur' },
              { type: 'email', message: 'Please input correct email address', trigger: 'blur,change' }
            ]">
            <el-input v-model="loginForm.email"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password"
            :rules="[
              { required: true, message: 'This field is required', trigger: 'blur' }
            ]">
            <el-input type="password" v-model="loginForm.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">Submit</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-container>
</template>
<script>
import { Button, Container, Col, Form, FormItem, Input, Row } from 'element-ui'

export default {
  name: 'login',
  components: {
    [Button.name]: Button,
    [Container.name]: Container,
    [Col.name]: Col,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Row.name]: Row
  },
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm () {
    }
  }
}
</script>
<style scoped>

</style>
