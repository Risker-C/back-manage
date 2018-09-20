<template>
  <div>
    <el-breadcrumb separator="/" style="margin:20px 0">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类图书列表页</el-breadcrumb-item>
    </el-breadcrumb>
    <h3>分类名：{{title}}</h3>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        label="书籍图片"
        align="center">
        <template slot-scope="tableData">
          <img :src="tableData.row.img" alt="加载失败" width="60px" height="80px" style="border-radius: 10%">
        </template>
      </el-table-column>
      <el-table-column
        label="书名"
        align="center">
        <template slot-scope="scope">
          <el-popover
            trigger="hover"
            :width=500
            placement="top">
            <p>作者：{{scope.row.author}}</p>
            <p>简介：{{scope.row.desc}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="nedium">{{scope.row.title}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center">
      </el-table-column>
      <el-table-column
        prop="index"
        label="index"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        width="300px"
        align="center">
        <template slot-scope="scope">
          <el-button @click="handleAdd(scope.row)" type="primary" size="small">生成轮播图</el-button>
          <el-button @click="handleEdit(scope.row._id)" type="success" size="small">编辑</el-button>
          <el-button @click="handleDelect(scope.row._id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 20]"
      :page-size="size"
      style="text-align: right;"
      layout="total, sizes, prev, pager, next"
      :total="count"></el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      categorys: [],
      ID: '',
      title: '',
      pn: 1,
      size: 5,
      count: 100
    }
  },
  methods: {
    handleSizeChange (val) {
      this.size = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.pn = val
      this.getData()
    },
    getData () {
      this.$axios.get(`/category/${this.ID}/books`, {
        pn: this.pn,
        size: this.size
      }).then(res => {
        this.tableData = res.data.data.books
        this.title = res.data.data.title
        this.count = res.data.count
      })
    },
    handleEdit (id) {
      this.$router.push(`editBook/?id=${id}`)
    },
    handleDelect (id) {
      this.$axios.delete(`/book/${id}`).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.warning(res.msg)
        }
        setTimeout(() => {
          this.getData()
        }, 1000)
      }).catch(err => {
        this.$message.error(err.msg)
      })
      this.centerDialogVisible = false
    },
    handleAdd (data) {
      var newImg = {
        title: data.title,
        img: data.img,
        index: 1,
        book: data._id
      }
      this.$axios.post('/swiper', newImg).then(res => {
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
    }
  },
  created () {
    this.ID = this.$route.query.id
    this.getData()
  }
}
</script>

<style scoped>
  h3 {
    font-weight: 600;
    margin: 30px auto;
    text-align: center;
  }
</style>
