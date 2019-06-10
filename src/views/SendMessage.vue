<template>
  <el-container direction="vertical">
    <el-row>
      <el-col :span="12" :offset="6">
        <h1>My Portal Messages</h1>
      </el-col>
    </el-row>
    <editor
      v-on:title-change="updateTitle"
      v-on:content-change="updateContent"
    />
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
  Message,
  MessageBox,
  Row,
  Input,
  Loading
} from "element-ui";
import Editor from "@/components/Editor.vue";
import { mapGetters } from "vuex";

export default {
  name: "messages",
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
      title: "",
      content: "",
      user: {
        emailAddress: ""
      },
      loadingInstance: null
    };
  },
  methods: {
    async sendMessage() {
      if (this.content === "" || this.title === "") {
        Message.error("Please fill both fields");
        return;
      }
      let messageTitle = this.title;
      let content = this.content;
      let email = this.user.emailAddress;
      let self = this;
      let topic = process.env.VUE_APP_TOPIC;
      this.$log.info(`Topic is ${topic}`);
      MessageBox.confirm(
        "Are you sure you want to send this message?",
        "Confirm",
        {
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          type: "info",
          callback: async function(action) {
            if (action === "confirm") {
              self.isLoading();
              await self.$store.dispatch("sendPushNotification", {
                messageTopic: topic,
                messageTitle: messageTitle,
                messageBody: content,
                emailAddress: email
              });
            } else {
              self.$log.info("Send action cancelled");
            }
          }
        }
      );
    },
    updateTitle(title) {
      this.title = title;
    },
    updateContent(content) {
      this.content = content;
    },
    isLoading() {
      const loadingOptions = {
        lock: true,
        text: "Sending message..",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      };

      this.loadingInstance = Loading.service(loadingOptions);
    }
  },
  computed: {
    ...mapGetters(["processLoading"])
  },
  watch: {
    processLoading(loading) {
      this.$log.info(`loading status: ${loading}`);
      if (!loading) {
        this.loadingInstance.close();
      }
    }
  },
  async mounted() {
    this.user.emailAddress = this.$store.state.userDetails.email;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
</style>
