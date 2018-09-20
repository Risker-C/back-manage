<template>
  <div>
    <el-breadcrumb separator="/" style="margin:20px 0">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>添加图书页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="图书名称" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="图书分类" prop="typeId">
        <el-select v-model="formData.typeId" placeholder="请选择" class="Main">
          <el-option
            v-for="item in options"
            :key="item._id"
            :label="item.title"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="爬虫链接" prop="url">
        <el-input v-model="formData.url"></el-input>
      </el-form-item>
      <el-form-item label="书籍图片" prop="img">
        <el-switch
          v-model="show"
          active-text="本地上传"
          inactive-text="上传链接"></el-switch>
        <uploadImg v-model="formData.img" v-show="show"></uploadImg>
        <el-input v-model="formData.img" v-show="!show"></el-input>
      </el-form-item>
      <el-form-item label="图书作者" prop="author">
        <el-input v-model="formData.author"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
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
      options: [],
      formData: {
        typeId: '',
        title: '',
        img: '',
        url: '',
        author: ''
      },
      show: true,
      rules: {
        title: [
          { required: true, message: '请输入图书名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '请选择图书分类', trigger: 'change' }
        ],
        url: [
          { required: true, message: '请上传图书地址', trigger: 'blur' },
          { type: 'url', message: '请确认地址是否正确', trigger: 'blur' }
        ],
        img: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ],
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' },
          { min: 1, max: 20, message: '长度请在 1 到 20 个字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log(this.formData)
          this.$axios.post('/book', this.formData).then(res => {
            console.log(res)
            if (res.code === 200) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              setTimeout(() => {
                this.$router.push('/layout/bookList')
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
        } else {
          this.$message({
            message: '信息未填写完整,请填写完整后再提交',
            type: 'warning'
          })
          return false
        }
      })
    },
    getOption () {
      this.$axios.get('/category').then(res => {
        console.log(res.data.data)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.$axios.get('/category').then(res => {
      var count = res.data.count
      this.$axios.get('/category', {
        pn: 1,
        size: count + 1
      }).then(res => {
        this.options = res.data.data
      })
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
  .line{
    margin: 30px 0;
  }
  .mt10{
    margin-top: 10px;
  }
  /* 图片上传样式 */
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: inline-block;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>
