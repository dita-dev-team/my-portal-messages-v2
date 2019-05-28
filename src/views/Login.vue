<template>
    <el-container direction="vertical">
        <el-row>
            <el-col :span="12" :offset="6">
                <el-form :model="loginForm" ref="loginForm">
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
                        <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginForm')" :disabled="!isFormValid">Submit
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-container>
</template>
<script>

    import {Button, Container, Col, Form, FormItem, Input, Row, Loading} from 'element-ui'
    import {mapGetters} from 'vuex'

    export default {
        name: 'login',
        components: {
            [Button.name]: Button,
            [Container.name]: Container,
            [Col.name]: Col,
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input,
            [Row.name]: Row,
        },
        data() {
            return {
                loginForm: {
                    email: '',
                    password: ''
                },
                loadingInstance: null
            }
        },
        methods: {
            async submitForm() {
                try {
                    await this.$store.dispatch('loginUser', {email: this.loginForm.email, password: this.loginForm.password});
                    this.$router.push('/sendMessage')
                } catch (e) {
                    this.$log.error(e.message);

                }
            },
            isLoading() {
                const loadingOptions = {
                    lock: true,
                    text: 'Authenticating User..',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                };

                this.loadingInstance = Loading.service(loadingOptions);
            }
        },
        computed: {
            isFormValid() {
                return this.loginForm.email !== '' && this.loginForm.password !== ''
            },
            user() {
                return this.$store.state.existsUser;
            },
            ...mapGetters([
                'processLoading'
            ])
        },
       mounted() {
            if (this.$store.state.existsUser !== null && this.$store.state.existsUser !== undefined) {
                this.$router.push('/sendMessage')
            }
        },
        watch: {

            processLoading(loading) {
                this.$log.info(`loading status: ${loading}`);
                if (loading) {
                    this.isLoading();
                } else {
                    if(this.loadingInstance === null){
                        return this.loadingInstance = null; /*Handle issue cannot read property .close() of null, while logging out*/
                    }
                    this.loadingInstance.close();
                }
            }
        }
    }
</script>
<style scoped>

</style>
