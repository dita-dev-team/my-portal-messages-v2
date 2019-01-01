<template>
    <el-container direction="vertical">
        <el-row>
            <el-col :span="12" :offset="6">
                <h1>My Portal Messages</h1>
            </el-col>
        </el-row>
        <editor v-on:title-change="updateTitle" v-on:content-change="updateContent" />
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
                title: '',
                content: ''
            }
        },
        methods: {
            async sendMessage() {
                if (this.content === '' || this.title === '') {
                    Message.error('Please fill both fields')
                    return
                }
                let messageTitle = this.title
                let content = this.content
                let self = this

                MessageBox.confirm('Are you sure you want to send this message?', 'Confirm', {
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    type: 'info',
                    callback: async function (action) {
                        if (action === 'confirm') {
                            await self.$store.dispatch('sendPushNotification', {
                                messageTopic: 'debug',
                                messageTitle: messageTitle,
                                messageBody: content
                            })

                        } else {
                            self.$log.info('Send action cancelled')
                        }
                    }
                })
            },
            updateTitle(title) {
                this.title = title
            },
            updateContent(content) {
                this.content = content
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
