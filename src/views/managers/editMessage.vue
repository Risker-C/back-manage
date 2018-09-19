<template>
  <div>
    <el-breadcrumb separator="/" style="margin:20px 0">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>修改管理员信息页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      ref="form"
      :model="formData"
      label-width="80px"
      style="width:500px;margin: 50px auto;text-align:center">
      <el-form-item label="用户名:">
        <el-input v-model="formData.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="formData.nickname"></el-input>
      </el-form-item>
      <el-form-item label="签名">
        <el-input v-model="formData.desc"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formData.email" type="email"></el-input>
      </el-form-item>
      <el-form-item label="头像" style="text-align:left">
        <uploadImg v-model="formData.avatar"></uploadImg>
      </el-form-item>
        <el-button type="primary" size="medium" style="width:50%" @click="handleSave">保存修改</el-button>
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
      formData: {}
    }
  },
  methods: {
    handleSave () {
      console.log(this.formData)
      this.$axios.put('/user/userInfo', {
        avatar: this.formData.avatar,
        desc: this.formData.desc,
        email: this.formData.email,
        nickname: this.formData.nickname
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push('/layout/managerList')
          }, 1000)
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    }
  },
  computed: {
    form () {
      return this.$store.state.data
    }
  },
  created () {
    this.formData = this.form
  }
}
</script>

<style scoped>

</style>
