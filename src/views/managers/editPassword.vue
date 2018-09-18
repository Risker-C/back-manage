<template>
  <div>
    <el-breadcrumb separator="/" style="margin:20px 0">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>修改管理员密码页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      label-position="left"
      label-width="80px"
      size="medium"
      style="width:400px;margin:80px auto 0px;fontSize:36px"
      v-model="formData">
      <el-form-item label="原密码 :">
        <el-input v-model="formData.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码 :">
        <el-input v-model="formData.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码 :">
        <el-input v-model="formData.checkPassword"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
