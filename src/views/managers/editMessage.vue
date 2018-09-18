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
      style="width:500px">
      <el-form-item label="用户名:">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="formData.nickname"></el-input>
      </el-form-item>
      <el-form-item label="签名">
        <el-input v-model="formData.desc"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <uploadImg v-model="formData.avatar"></uploadImg>
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
      formData: {}
    }
  },
  methods: {
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
