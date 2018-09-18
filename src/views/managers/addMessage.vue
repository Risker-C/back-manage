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
      style="width:500px;margin:50px auto 0">
      <el-form-item label="用户名：">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="昵称：">
        <el-input v-model="formData.nickname"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：">
        <el-input v-model="formData.checkpassword"></el-input>
      </el-form-item>
      <el-form-item label="个性签名：">
        <el-input v-model="formData.desc"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱：">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        username: '',
        nickname: '',
        password: '',
        checkpassword: '',
        desc: '',
        email: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
