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
        <el-row>
            <el-col :span="12" :offset="6">
                <quill-editor v-model="content"
                              ref="myQuillEditor"
                              :options="editorOption"
                              @blur="onEditorBlur($event)"
                              @focus="onEditorFocus($event)"
                              @ready="onEditorReady($event)">
                </quill-editor>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12" :offset="6">
                <p class="text-right"> {{ messageLength }} / 2000 </p>
            </el-col>
        </el-row>

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

    import {quillEditor} from 'vue-quill-editor'

    let toolbarOptions = {
        container: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            [{'header': 1}, {'header': 2}],               // custom button values
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
            [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
            [{'direction': 'rtl'}],                         // text direction
            [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
            [{'header': [1, 2, 3, 4, 5, 6, false]}],
            [{'color': []}, {'background': []}],          // dropdown with defaults from theme
            [{'font': []}],
            [{'align': []}],
            ['clean']
        ]
    }


    export default {
        name: 'messages',
        components: {
            [Button.name]: Button,
            [Col.name]: Col,
            [Container.name]: Container,
            [Row.name]: Row,
            [Input.name]: Input,
            editor: Editor,
            quillEditor
        },
        data() {
            return {
                titleMessage: '',
                editorOption: {
                    modules: {
                        toolbar: toolbarOptions
                    }
                },
                messageLength: 0,
                maxLength: 2000,
                content: ''
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
            onEditorBlur(quill) {
                this.$log.info('editor blur!', quill)
            },
            onEditorFocus(quill) {
                this.$log.info('editor focus!', quill)
            },
            onEditorReady(quill) {
                this.$log.info('editor ready!', quill)
            },
            onEditorChange({quill, html, text}) {
                this.$log.info('editor change!', quill, html, text)
                this.content = html
            }
        },
        async mounted() {
            await this.$store.dispatch('fetchAccessToken', {
                email: this.$store.state.userDetails.email,
                uid: this.$store.state.userDetails.uid
            });
        },
        watch: {
            content: function (val) {
                this.messageLength = val.length
                // this.editor.enable(this.messageLength >= this.maxLength)
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
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
