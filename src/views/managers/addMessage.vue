<template>
  <div>
    <el-breadcrumb separator="/" style="margin:20px 0">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>添加管理员信息页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      ref="form"
      :model="formData"
      label-width="100px"
      label-position="left"
      status-icon
      :rules="rules"
      style="width:500px;margin:50px auto 0">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="formData.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="checkPassword">
        <el-input v-model="formData.checkPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="昵称：" prop="nickname">
        <el-input v-model="formData.nickname" ></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱：" prop="email">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="个性签名：" prop="desc">
        <el-input v-model="formData.desc" type="textarea"></el-input>
      </el-form-item>
      <el-form-item
        label="头像"
        prop="avater">
        <el-switch
          v-model="show"
          active-text="本地上传"
          inactive-text="上传链接"></el-switch>
        <uploadImg v-model="formData.avatar" v-show="show"></uploadImg>
        <el-input v-model="formData.avatar" v-show="!show"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click="submitForm()">创建</el-button>
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
    var validatePassword = (rule, value, callback) => {
      if (value !== this.formData.password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        username: '',
        nickname: '',
        password: '',
        checkPassword: '',
        desc: '',
        email: '',
        avatar: ''
      },
      show: true,
      rules: {
        username: [
          {required: true, message: '请输入用户名', targger: 'blur'},
          {min: 3, max: 10, message: '用户名长度在3-5个字符', targger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', targger: 'blur'},
          {min: 3, max: 10, message: '密码长度在5-10个字符', targger: 'blur'}
        ],
        checkPassword: [
          {required: true, message: '请确认密码', targger: 'blur'},
          {validator: validatePassword}
        ],
        nickname: [
          {required: true, message: '请输入昵称', targger: 'blur'},
          {min: 3, max: 10, message: '昵称长度在3-8个字符', targger: 'blur'}
        ],
        desc: [
          {required: true, message: '请输入签名', targger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', targger: 'blur'},
          {type: 'email', message: '请输入正确邮箱', targger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.formData.avatar !== '') {
            this.$axios.post('/user', this.formData).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
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
              message: '未上传头像,请选择头像后再次提交',
              type: 'warning'
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
