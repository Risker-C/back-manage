<template>
  <div>
    <el-breadcrumb separator="/" style="margin:20px 0">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>添加分类页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-formData">
  <el-form-item label="分类名" prop="name" >
    <el-input v-model="formData.name" placeholder="请输入3-5个字符的分类名"></el-input>
  </el-form-item>
  <el-form-item label="分类图片" prop="image" >
    <el-switch  v-model="formData.uploadType"  class="Header"
      active-text="填写链接"  inactive-text="手动上传">
      </el-switch>
      <div class="uploadByLink" v-if="formData.uploadType">
          <el-input v-model="formData.ImgLink"  placeholder="请输入内容" clearable></el-input>
        </div>
      <div class="uploadByImg" v-else>
        <el-upload
          class="avatar-uploader"
          action="https://upload-z1.qiniup.com"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="formData.imageUrl" :src="formData.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
  </el-form-item>
  <el-form-item label="分类排序" prop="index">
    <template>
      <el-input-number v-model="formData.index" @change="handleChange" :min="1" :max="999" label="描述文字"></el-input-number>
    </template>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        uploadType: true,
        index: 1
      },
      rules: {
        name: [
          { required: true, message: '请输入分类名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '请设置图片', trigger: 'blur' }
        ],
        index: [
          { required: true, message: '请设置图片', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .el-form-item{
    margin-top: 30px;
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
