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
      <el-form-item label="对应图书" prop="category">
        <el-select
          v-model="formData.category"
          placeholder="请选择图书"
          @change="checkCategory"
          @visible-change="changeShowBooks">
          <el-option v-for="item in categorys"
            size="medium"
            :key="item._id"
            :label="item.title"
            :value="item._id"></el-option>
        </el-select>
        <div v-if="formData.book" class="box">
          <div class="box-left">
            <img :src="book.img">
          </div>
          <div class="box-right">
            <div class="title">{{book.title}}</div>
            <div class="author">{{book.author}}</div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="图片序号">
        <el-input-number v-model="formData.index" size="small" :min="1" :max="999"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" style="width:80%" @click="handleUpload">提交</el-button>
      </el-form-item>
    </el-form>
    <el-dialog 
      title="选择图书"
      show-close
      :visible.sync="showBooks"
      :center="true">
      <el-table :data="books">
        <el-table-column prop="title" label="书籍名称" width="200px" align="center"></el-table-column>
        <el-table-column label="书籍图片" align="center">
          <template slot-scope="scope" >
            <img :src="scope.row.img" alt="" class="tableImg">
          </template>
        </el-table-column>
        <el-table-column prop="author" label="书籍作者" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="checkBook(scope.row)" type="primary" size="small">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        style="text-align:right"
        layout="prev, pager, next"
        :page-size="5"
        :total="count">
      </el-pagination>
    </el-dialog>
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
      categorys: [],
      books: [],
      book: {},
      formData: {
        title: '',
        img: '',
        book: '',
        category: '',
        index: 0
      },
      show: true,
      showBooks: false,
      count: 5,
      rules: {
        title: [
          {required: true, message: '请输入轮播图标题', trigger: 'blur'},
          {min: 3, max: 20, message: '标题请控制在3-20字符之间', trigger: 'blur'}
        ],
        category: [
          {required: true, message: '请选择对应的书籍', trigger: 'change'}
        ],
        img: [
          {validator: validateImg, trigger: 'hover'}
        ]
      }
    }
  },
  methods: {
    changeShowBooks (val) {
      if (!val) {
        this.showBooks = true
      }
    },
    getCategorys () {
      this.$axios.get('/category', {
        pn: 1,
        size: 100
      }).then(res => {
        this.categorys = res.data.data
        console.log(this.categorys)
      }).catch(err => {
        console.log(err)
      })
    },
    handleUpload () {
      console.log(this.formData)
      if (this.formData.img !== '') {
        // this.$axios.post('/swiper', this.formData).then(res => {
        //   console.log(res)
        //   if (res.code === 200) {
        //     this.$message({
        //       message: res.msg,
        //       type: 'success'
        //     })
        //   } else {
        //     this.$message({
        //       message: res.msg,
        //       type: 'warning'
        //     })
        //   }
        //   setTimeout(() => {
        //     this.$router.push('/layout/imgManage')
        //   }, 1000)
        // }).catch(err => {
        //   console.log(err)
        //   this.$message.error(err.msg)
        // })
      } else {
        this.$message({
          message: '请上传图片',
          type: 'warning'
        })
      }
    },
    checkCategory () {
      if (this.formData.category) {
        this.$axios.get(`/category/${this.formData.category}/books`, {
          pn: 1,
          size: 100
        }).then(res => {
          this.books = res.data.data.books
          this.count = res.data.count
        }).catch(err => {
          console.log(err)
        })
      }
    },
    checkBook (book) {
      this.formData.book = book._id
      this.showBooks = false
      this.book = book
    }
  },
  created () {
    this.getCategorys()
  }
}
</script>

<style scoped>
  .box {
    width: 300px;
    height: 200px;
    border:1px solid #333;
    border-radius: 4px;
  }
</style>
