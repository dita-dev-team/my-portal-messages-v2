<template>
  <el-upload
      class="upload-file"
      drag
      action=""
      :show-file-list="false"
      :multiple="false"
      :on-success="handleFileUploadSuccess"
      :on-failure="handleFileUploadFailure"
      :on-progress="handleFileUploadProgress"
      :before-upload="beforeFileUpload"
      :http-request="uploadFile">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
    <div class="el-upload__tip" slot="tip">xls/xlsx files with a size less than 8mb</div>
  </el-upload>
</template>

<script>
    import {Loading, Message, Upload} from 'element-ui'
    import {mapGetters} from 'vuex'

    export default {
        name: 'exam-upload',
        components: {
            [Upload.name]: Upload
        },
        data() {
            return {
                loadingInstance: null
            }
        },
        methods: {
            handleFileUploadProgress(event) {
                this.$log.info(event)
            },
            handleFileUploadSuccess() {
                this.$log.info('Excel file uploaded successfully.');
                Message.info('Excel file uploaded successfully.');
            },
            handleFileUploadFailure(err) {
                this.$log.error('Upload failed: ', err);
                Message.error(err);
            },
            beforeFileUpload(file) {
                const isExcel = file.type === 'application/vnd.ms-excel' ||
                    file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                const isLt8M = file.size / 1024 / 1024 < 8;

                if (!isExcel) {
                    Message.error('File must be xls/xlsx format!');
                }
                if (!isLt8M) {
                    Message.error('File size can not exceed 2MB!');
                }
                return isExcel && isLt8M;
            },
            getHeaders() {
                return {
                    Authorization: `Bearer ${this.$store.state.jwtWebToken}`
                }
            },
            uploadFile(file) {
                this.$log.info(file);
                try {
                    this.$store.dispatch('uploadFile', file.file);
                } catch (e) {
                    this.$log.error(e.message);
                }
            },
            isLoading() {
                const loadingOptions = {
                    lock: true,
                    text: 'Uploading excel...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                };
                this.loadingInstance = Loading.service(loadingOptions);
            }
        },
        computed: {
            ...mapGetters([
                'processLoading'
            ])
        },
        watch: {
            processLoading(loading) {
                this.$log.info(`loading status: ${loading}`);
                if (loading) {
                    this.isLoading();
                } else {
                    this.loadingInstance.close();
                }
            }
        }
    }
</script>

<style scoped>
  .upload-file {
    margin-top: 20px;
  }

</style>