<template>
  <div>
    <el-breadcrumb separator="/" style="margin:20px 0">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类修改页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="formData" label-width="80px" class="mgform">
      <el-form-item label="分类标题">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="分类图片">
        <uploadImg v-model="formData.icon"></uploadImg>
      </el-form-item>
      <el-form-item label="分类排序">
        <el-input-number v-model="formData.index" :min="1" :max="999"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSubmit" type="primary" style="width:80%">保存修改</el-button>
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
        icon: '',
        index: ''
      },
      id: ''
    }
  },
  methods: {
    getData () {
      this.$axios.get(`/category/${this.id}`).then(res => {
        this.formData = {...this.formData, ...res.data.data}
      })
    },
    handleSubmit () {
      this.$axios.put(`/category/${this.id}`, this.formData).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          setTimeout(() => {
            this.$router.push({name: 'categoryList'})
          }, 1000)
        } else {
          this.$message.warning(res.msg)
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getData()
  }
}
</script>

<style scoped>

</style>
