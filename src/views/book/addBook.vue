<template>
  <div>
    <el-breadcrumb separator="/" style="margin:20px 0">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>添加图书页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="图书名称" prop="name">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="图书分类" prop="region">
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
      <el-form-item label="书籍图片" prop="image">
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
        name: [
          { required: true, message: '请输入图书名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择图书分类', trigger: 'change' }
        ],
        url: [
          { required: true, message: '请上传图书地址', trigger: 'blur'},
          { type: 'url', message: '请确认地址是否正确', trigger: 'blur'}
        ],
        image: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.form.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleUpload () {
      console.log()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
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
  created() {
    this.$axios.get('/category').then(res => {
        console.log(res.data.count)
        var count = res.data.count
        this.$axios.get('/category',{
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
