<template>
  <div>
    <el-breadcrumb separator="/" style="margin:20px 0">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>添加轮播图页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :rules="rules" :model="formData" ref="form" label-width="80px" style="width:500px;margin: 50px auto">
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
        <div v-if="formData.book" class="box clearfix">
          <div class="box-left">
            <img :src="book.img">
          </div>
          <div class="box-right">
            <span>书籍名称：</span><div class="title"><nobr>{{book.title}}</nobr></div>
            <span>书籍作者：</span><div class="author"><nobr>{{book.author}}</nobr></div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="图片序号">
        <el-input-number v-model="formData.index" size="small" :min="1" :max="999"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" style="width:80%" @click="handleUpload" v-if="isEdit">保存修改</el-button>
        <el-button type="primary" size="medium" style="width:80%" @click="handleUpload" v-else>提交</el-button>
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
    // var validateImg = (rule, value, callback) => {
    //   if (this.formData.img !== '') {
    //     callback()
    //   } else {
    //     callback(new Error('请上传图片'))
    //   }
    // }
    var validateBook = (rule, value, callback) => {
      if (this.formData.book !== '') {
        callback()
      } else {
        callback(new Error('请选择对应书籍'))
      }
    }
    return {
      categorys: [],
      books: [],
      book: {},
      ImgID: '',
      formData: {
        title: '',
        img: '',
        book: '',
        category: '',
        index: 0
      },
      show: true,
      showBooks: false,
      isEdit: false,
      count: 5,
      rules: {
        title: [
          {required: true, message: '请输入轮播图标题', trigger: 'blur'},
          {min: 3, max: 20, message: '标题请控制在3-20字符之间', trigger: 'blur'}
        ],
        category: [
          {required: true, message: '请选择对应的分类', trigger: 'change'},
          {validator: validateBook, trigger: 'blur'}
        ],
        img: [
          {required: true, message: '请上传图片', trigger: 'blur'},
          {type: 'url', message: '请确认地址是否正确', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    /**
     * 添加
     */
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
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    handleUpload () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.formData.img === '') {
            this.$message({
              message: '请上传图片',
              type: 'warning'
            })
          } else if (this.formData.book === '') {
            this.$message({
              message: '请选择图书',
              type: 'warning'
            })
          } else {
            if (this.isEdit) {
              this.edit()
            } else {
              this.upload()
            }
          }
        } else {
          return false
        }
      })
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
          this.$message.error(err.msg)
        })
      }
    },
    checkBook (book) {
      this.formData.book = book._id
      this.showBooks = false
      this.book = book
    },
    upload () {
      this.$axios.post('/swiper', this.formData).then(res => {
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
        this.$message.error(err.msg)
      })
    },
    edit () {
      this.$axios.put(`/swiper/${this.ImgID}`, this.formData).then(res => {
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
        this.$message.error(err.msg)
      })
    },
    /**
     * 编辑
     */
    getData () {
      this.$axios.get(`/swiper/${this.ImgID}`).then(res => {
        this.formData = {
          ...this.formData,
          ...res.data.data,
          category: res.data.data.book.type,
          book: res.data.data.book._id
        }
        this.book = res.data.data.book
      })
    }
  },
  created () {
    if (this.$route.query.id) {
      this.ImgID = this.$route.query.id
      this.isEdit = true
      this.getData()
    }
    this.getCategorys()
  }
}
</script>

<style scoped lang="scss">
  .box {
    width: 300px;
    height: 200px;
    border:3px solid #999;
    border-radius: 10px;
    margin: 20px 0;

    .box-left {
      width: 100px;
      height: 150px;
      float: left;
      margin: 20px;

      img {
        width: 100px;
        height: 150px;
      }
    }

    .box-right {
      float: left;
      margin: 20px 0;

      span {
        font-weight: 700;
        font-size: 16px;
      }

      div {
        margin-left: 10px;
        height: 40px;
        width: 130px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .title {
        font-weight: 500;
        font-size: 14px;
      }

      .author {
        font-weight: 500;
        font-size: 12px;
      }
    }
  }
</style>
