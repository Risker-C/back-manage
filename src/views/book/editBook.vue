<template>
  <div>
    <el-breadcrumb separator="/" style="margin:20px 0">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>修改图书信息页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="书籍ID" prop="_id">
        <el-input v-model="formData._id" disabled></el-input>
      </el-form-item>
      <el-form-item label="书籍标题" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="书籍作者" prop="author">
        <el-input v-model="formData.author"></el-input>
      </el-form-item>
      <el-form-item label="书籍分类" prop="type">
        <el-select v-model="formData.type" placeholder="请选择" class="Main">
          <el-option
            v-for="item in categorys"
            :key="item._id"
            :label="item.title"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="书籍排序">
        <el-input-number v-model="formData.index" :min="1" :max="999"></el-input-number>
      </el-form-item>
      <el-form-item label="书籍图片" prop="img">
        <el-switch
          v-model="show"
          active-text="本地上传"
          inactive-text="上传链接"></el-switch>
        <uploadImg v-model="formData.img" v-show="show"></uploadImg>
        <el-input v-model="formData.img" v-show="!show"></el-input>
      </el-form-item>
      <el-form-item label="书籍简介" prop="desc">
        <el-input type="textarea" v-model="formData.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')">保存修改</el-button>
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
      formData: {},
      categorys: [],
      show: false,
      rules: {
        title: [
          { required: true, message: '请输入书籍标题', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入书籍作者', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择图书分类', trigger: 'change' }
        ],
        img: [
          { required: true, message: '请上传图片', trigger: 'change' },
          { type: 'url', message: '请确认地址是否正确', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写书籍简介', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$axios.put('/book', this.formData).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg)
              setTimeout(() => {
                this.$router.push('/layout/bookList')
              }, 1000)
            } else {
              this.$message.warning(res.msg)
            }
          }).catch(err => {
            this.$message.error(err.msg)
          })
        } else {
          return false
        }
      })
    }
  },
  created () {
    this.ID = this.$route.query.id
    this.isEdit = true
    this.$axios.get(`book/${this.ID}`).then(res => {
      this.formData = {
        ...res.data.data,
        book_id: this.ID
      }
    })
    this.$axios.get('/category').then(res => {
      this.categorys = res.data.data
    })
  }
}
</script>

<style scoped>

</style>
