<template>
  <div>
    <el-breadcrumb separator="/" style="margin:20px 0">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>添加分类页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="formData"
      :rules="rules"
      ref="form"
      label-width="100px"
      style="width: 500px;margin: 50px auto"
      class="demo-formData">
      <el-form-item label="分类名称" prop="title" >
        <el-input v-model="formData.title" placeholder="请输入1-10个字符的分类名"></el-input>
      </el-form-item>
      <el-form-item label="分类图片" prop="icon" >
        <el-switch
          v-model="uploadType"
          active-text="填写链接"
          inactive-text="手动上传">
        </el-switch>
          <el-input v-model="formData.icon" v-show="uploadType"  placeholder="请输入内容" ></el-input>
          <uploadImg v-model="formData.icon" v-show="!uploadType"></uploadImg>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 84%" @click="submitForm('formData')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import uploadImg from '@/components/uploadImg'

export default {
  components: {
    uploadImg
  },
  data () {
    return {
      formData: {
        title: '',
        icon: ''
      },
      uploadType: true,
      index: 1,
      rules: {
        title: [
          { required: true, message: '请输入分类名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请上传分类图标', trigger: 'change' },
          { type: 'url', message: '请确认图片地址是否正确', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$axios.post('/category', this.formData).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              setTimeout(() => {
                this.$router.push('/layout/categoryList')
              }, 100)
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
          }).catch(err => {
            this.$message.error(err.msg)
          })
        } else {
          this.$message({
            message: '信息未填写完整，请填写完整后再次提交',
            type: 'warning'
          })
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .el-form-item{
    margin-top: 50px;
  }
</style>
