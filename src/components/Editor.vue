<template>
  <div>
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
          @change="onEditorChange($event)"
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
  </div>
</template>

<script>
import { Col, Input, Row } from "element-ui";

import { quillEditor } from "vue-quill-editor";

let toolbarOptions = {
  container: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
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
  ]
};

export default {
  name: "Editor",
  components: {
    [Col.name]: Col,
    [Input.name]: Input,
    [Row.name]: Row,
    quillEditor
  },
  data() {
    return {
      title: "",
      content: "",
      editorOption: {
        modules: {
          toolbar: toolbarOptions
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
    },
    title: function(val) {
      this.$emit("title-change", val);
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
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
      this.$emit("content-change", text);
    }
  }
};
</script>

<style scoped></style>
