<template>
    <el-container direction="vertical">
        <el-row>
            <el-col :span="12" :offset="6">
                <h1>My Portal Messages</h1>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12" :offset="6">
                <el-input v-model="titleMessage" placeholder="Title"></el-input>
            </el-col>
        </el-row>
        <editor :dataText="content"/>
        <el-row>
            <el-col :span="12" :offset="6">
                <el-button @click="sendMessage">Submit</el-button>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
    /* eslint-disable */
    import {Button, Col, Container, Message, MessageBox, Row, Input} from 'element-ui'

    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import Editor from '@/components/Editor.vue'

    export default {
        name: 'messages',
        components: {
            [Button.name]: Button,
            [Col.name]: Col,
            [Container.name]: Container,
            [Row.name]: Row,
            [Input.name]: Input,
            editor: Editor
        },
        data() {
            return {
                content: 'This message is sent from the vue client',
                titleMessage: 'UI Integration Tests'
            }
        },
        methods: {
            async sendMessage() {
                if (this.content === '' || this.titleMessage === '') {
                    Message.error('Please fill both fields')
                    return
                }
                let messageTitle = this.titleMessage
                let content = this.content
                await this.$store.dispatch('sendPushNotification', {
                    messageTopic: 'debug',
                    messageTitle: messageTitle,
                    messageBody: content
                })
                MessageBox.confirm('Are you sure you want to send this message?', 'Confirm', {
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    type: 'info',
                    callback: async function (action) {
                        if (action === 'confirm') {


                        } else {
                            self.$log.info('Send action cancelled')
                        }
                    }
                })
            }
        },
        async mounted() {
            await this.$store.dispatch('fetchAccessToken', {
                email: this.$store.state.userDetails.email,
                uid: this.$store.state.userDetails.uid
            });
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

</style>
