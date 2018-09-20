<template>
  <div class="box">
    <h1>欢迎来到小书虫后台管理系统</h1>
    <div class= 'login'>
      <h2>请登录</h2>
      <el-form :model="formData" :rules="rules" ref="form" label-position='top' label-width='80px'>
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="formData.username"  placeholder='请输入用户名'></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            v-model="formData.password"
            type='password'
            placeholder='请输入密码'>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type='primary' class='btn' @click="login_btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login_btn () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$axios.post('/login', this.formData).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '登录成功',
                type: 'success'
              })
              var userData = {...res.data, password: this.formData.password}
              this.$store.commit('login', userData)
              setTimeout(() => {
                this.$router.push({path: '/layout'})
              }, 1000)
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
          }).catch(err => {
            this.$message({
              showClose: true,
              message: err.msg,
              type: 'error'
            })
          })
        } else {
          this.$message.error('用户信息未填写完整')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
  .box {
    overflow: hidden;
    height: 100vh;
    background-color: rgb(84, 92, 100);
    color: #fff
  }
  .box {
    h1{
      margin-top: 30px;
      text-align: center;
      font-weight: 500
    }
  }
  .login {
    width: 400px;
    height: 300px;
    border: 1px solid #fff;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
  }
  .login{
    .btn{
      width: 100%;
    }
  }
</style>
