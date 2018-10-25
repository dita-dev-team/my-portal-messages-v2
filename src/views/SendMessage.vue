<template>
    <el-container direction="vertical">
        <el-row>
            <el-col :span="12" :offset="6">
                <h1>My Portal Messages</h1>
            </el-col>
        </el-row>
        <editor />
        <el-row>
            <el-col :span="12" :offset="6">
                <el-button @click="sendMessage">Submit</el-button>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>

    import {Button, Col, Container, Message, MessageBox, Row} from 'element-ui'
    import sendNotification from '../notification'

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
            editor: Editor
        },
        data() {
            return {}
        },
        methods: {
            sendMessage() {
                let self = this
                if (this.content === '' || this.title === '') {
                    Message.error('Please fill both fields')
                    return
                }
                MessageBox.confirm('Are you sure you want to send this message?', 'Confirm', {
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    type: 'info',
                    callback: function (action) {
                        if (action === 'confirm') {
                            sendNotification(self.title, self.content, '/topics/messages')
                        } else {
                            self.$log.info('Send action cancelled')
                        }
                    }
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

</style>
