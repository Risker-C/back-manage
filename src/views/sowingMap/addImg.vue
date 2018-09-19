<template>
  <div>
    <el-breadcrumb separator="/" style="margin:20px 0">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>添加轮播图页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :rules="rules" :model="formData" label-width="80px" style="width:500px;margin: 50px auto">
      <el-form-item label="图片标题" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="上传图片" prop="img">
        <el-switch
          v-model="show"
          active-text="本地上传"
          inactive-text="上传链接"></el-switch>
        <uploadImg v-model="formData.img" v-show="show"></uploadImg>
        <el-input v-model="formData.img" v-show="!show"></el-input>
      </el-form-item>
      <el-form-item label="对应图书" prop="book">
        <el-select v-model="formData.book" placeholder="请选择图书">
          <el-option v-for="item in books"
            size="medium"
            :key="item._id"
            :label="item.title"
            :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片序号">
        <el-input-number v-model="formData.index" size="small" :min="1" :max="999"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" style="width:80%" @click="handleUpload">提交</el-button>
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
    var validateImg = (rule, value, callback) => {
      if (this.formData.img !== '') {
        callback()
      } else {
        callback(new Error('请上传图片'))
      }
    }
    return {
      books: [],
      formData: {
        title: '',
        img: '',
        book: '',
        index: 0
      },
      show: true,
      rules: {
        title: [
          {required: true, message: '请输入轮播图标题', trigger: 'blur'},
          {min: 3, max: 20, message: '标题请控制在3-20字符之间', trigger: 'blur'}
        ],
        book: [
          {required: true, message: '请选择对应的书籍', trigger: 'change'}
        ],
        img: [
          {validator: validateImg, trigger: 'hover'}
        ]
      }
    }
  },
  methods: {
    getBook () {
      this.$axios.get('/book', {
        pn: 1,
        size: 20
      }).then(res => {
        this.books = res.data.data
        console.log(this.books)
      }).catch(err => {
        console.log(err)
      })
    },
    handleUpload () {
      console.log(this.formData)
      if (this.formData.img !== '') {
        this.$axios.post('/swiper', this.formData).then(res => {
          console.log(res)
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
          setTimeout(() => {
            this.$router.push('/layout/imgManage')
          }, 1000)
        }).catch(err => {
          console.log(err)
          this.$message.error(err.msg)
        })
      } else {
        this.$message({
          message: '请上传图片',
          type: 'warning'
        })
      }
    }
  },
  created () {
    this.getBook()
  }
}
</script>

<style scoped>

</style>
