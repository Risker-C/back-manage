<template>
  <div>
    <el-breadcrumb separator="/" style="margin:20px 0">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>添加图书页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="图书分类" prop="region">
        <el-select v-model="form.bookType" placeholder="请选择" class="Main">
          <el-option  v-for="item in options"  :key="item.value"
            :label="item.label"  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="爬虫链接" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="书籍图片" prop="image">
        <el-switch  v-model="form.uploadType"  class="Header"
          active-text="填写链接"  inactive-text="手动上传">
          </el-switch>
          <div class="uploadByLink" v-if="form.uploadType">
              <el-input v-model="form.ImgLink"  placeholder="请输入内容" clearable></el-input>
            </div>
          <div class="uploadByImg" v-else>
            <el-upload
              class="avatar-uploader"
              action="https://upload-z1.qiniup.com"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
      </el-form-item>
      <el-form-item label="图书作者" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      form: {
        uploadType: true,
        bookType: '',
        bookName: '',
        ImgLink: '',
        imageUrl: '',
        bookLink: '',
        bookAuthor: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        image: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.form.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleUpload () {
      console.log()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
  .line{
    margin: 30px 0;
  }
  .mt10{
    margin-top: 10px;
  }
  /* 图片上传样式 */
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: inline-block;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>
