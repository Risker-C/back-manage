<template>
  <div class="box">
    <h1>欢迎来到小书虫后台管理系统</h1>
    <div class= 'login'>
      <h2>请登录</h2>
      <el-form label-position='top' label-width='80px'>
        <el-form-item label="用户名：">
          <el-input v-model="formDate.username"  placeholder='请输入用户名'></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="formDate.password" type='password' placeholder='请输入密码'></el-input>
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
      formDate: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login_btn () {
      this.$axios.post('/login', this.formDate).then(res => {
        this.$message({
          message: '登录成功',
          type: 'success'})
        if (res.code === 200) {
          this.$store.commit('login', res.data)
          setTimeout(() => {
            this.$router.push({path: '/layout'})
          }, 1000)
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          showClose: true,
          message: err.msg,
          type: 'error'})
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
