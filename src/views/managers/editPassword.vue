<template>
  <div>
    <el-breadcrumb separator="/" style="margin:20px 0">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>修改管理员密码页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      label-position="left"
      label-width="100px"
      size="medium"
      style="width:400px;margin:80px auto 0px;fontSize:36px;text-align:center"
      :rules="rules"
      ref="form"
      :model="formData">
      <el-form-item label="原密码 :" prop="oldPassword">
        <el-input v-model="formData.oldPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码 :" prop="newPassword">
        <el-input v-model="formData.newPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码 :" prop="checkPassword">
        <el-input v-model="formData.checkPassword" type="password"></el-input>
      </el-form-item>
      <el-button @click="handleChange" type="primary" style="width:60%">修改</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      var password = this.$store.state.data.password
      if (value === password) {
        callback()
      } else {
        callback(new Error('密码错误'))
      }
    }
    var validateCheck = (rule, value, callback) => {
      if (value !== this.formData.newPassword) {
        callback(new Error('两次密码不一致，请重确认密码'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        oldPassword: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ],
        newPassword: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          {min: 3, max: 10, message: '密码请输入3-10字符', trigger: 'blur'}
        ],
        checkPassword: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
          {validator: validateCheck, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleChange () {
      this.$axios.put('/user/password', {
        password: this.formData.oldPassword,
        new_password: this.formData.newPassword
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          var userData = {...this.$store.state.data, password: this.formData.newPassword}
          this.$store.commit('login', userData)
          setTimeout(() => {
            this.$router.push('/layout/managerList')
          }, 1000)
          console.log(userData)
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
    }
  }
}
</script>

<style scoped>

</style>
