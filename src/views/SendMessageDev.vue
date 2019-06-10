<template>
  <el-container direction="vertical">
    <el-row>
      <el-col :span="12" :offset="6">
        <h1>My Portal Messages Dev</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
        <el-input
          v-model="firebaseToken"
          placeholder="Firebase token"
        ></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
        <el-input v-model="title" placeholder="Title"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
        >
        </quill-editor>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
        <p class="text-right">{{ messageLength }} / 2000</p>
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
import {
  Button,
  Col,
  Container,
  Input,
  Message,
  MessageBox,
  Row
} from "element-ui";
import sendNotification from "../notification";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

let toolbarOptions = {
  container: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["emoji"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["clean"]
  ],
  handlers: { emoji: function() {} }
};

export default {
  name: "messages-dev",
  components: {
    [Button.name]: Button,
    [Col.name]: Col,
    [Container.name]: Container,
    [Input.name]: Input,
    [Row.name]: Row,
    quillEditor
  },
  data() {
    return {
      content: "",
      title: "",
      firebaseToken: "",
      editorOption: {
        modules: {
          toolbar: toolbarOptions,
          "emoji-toolbar": true,
          "emoji-textarea": true,
          "emoji-shortname": true
        }
      },
      messageLength: 0,
      maxLength: 2000
    };
  },
  watch: {
    content: function(val) {
      this.messageLength = val.length;
      // this.editor.enable(this.messageLength >= this.maxLength)
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    sendMessage() {
      let self = this;
      if (
        this.content === "" ||
        this.title === "" ||
        this.firebaseToken === ""
      ) {
        Message.error("Please fill both fields");
        return;
      }
      MessageBox.confirm(
        "Are you sure you want to send this message?",
        "Confirm",
        {
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          type: "info",
          callback: function(action) {
            if (action === "confirm") {
              sendNotification(self.title, self.content, self.firebaseToken);
            } else {
              self.$log.info("Send action cancelled");
            }
          }
        }
      );
    },
    onEditorBlur(quill) {
      this.$log.info("editor blur!", quill);
    },
    onEditorFocus(quill) {
      this.$log.info("editor focus!", quill);
    },
    onEditorReady(quill) {
      this.$log.info("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      this.$log.info("editor change!", quill, html, text);
      this.content = html;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

.el-container {
  padding: 20px 80px;
}

.el-row {
  width: 100%;
  margin: 8px;
}
</style>
