<template>
  <div>
    <el-breadcrumb separator="/" style="margin:20px 0">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="title"
        label="分类名"
        align="center">
      </el-table-column>
      <el-table-column
        label="分类图标"
        align="center">
        <template slot-scope="data">
          <img :src= "data.row.icon" alt="" style="width: 60px;height: 60px;border-radius: 20%">
        </template>
      </el-table-column>
      <el-table-column
        prop="index"
        label="分类排序"
        align="center">
      </el-table-column>
      <el-table-column
        prop="status"
        label="书籍数量"
        align="center">
      </el-table-column>
      <el-table-column
        prop="_id"
        label="分类ID"
        width="250px"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        width="250px"
        align="center">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="handleClick(scope.row)" type="success" size="small">详情</el-button>
          <el-button @click="handleTips(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 20]"
      :page-size="size"
      :pager-count="5"
      layout="total, sizes, prev, pager, next"
      style="text-align: right;"
      :total="count">
    </el-pagination>
    <el-dialog
      title="删除图书提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>执行删除操作,将不可撤销,是否确认继续删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">取 消</el-button>
        <el-button @click="handleDelect">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      pn: 1,
      size: 5,
      count: 10,
      centerDialogVisible: false,
      id: ''
    }
  },
  methods: {
    handleClick (data) {
      this.$router.push({name: 'categoryBooks', query: {id: data._id}})
    },
    handleEdit (data) {
      this.$router.push({name: 'editCategory', query: {id: data._id}})
    },
    handleDelect () {
      this.$axios.delete(`/category/${this.id}`).then(res => {
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
    getData () {
      this.$axios.get('/category', {
        pn: this.pn,
        size: this.size
      }).then(res => {
        this.count = res.data.count
        this.tableData = res.data.data
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    handleSizeChange (val) {
      this.size = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.pn = val
      this.getData()
    },
    handleTips (val) {
      if (val.books.length === 0) {
        this.id = val._id
        this.centerDialogVisible = true
      } else {
        this.$message.warning('该分类下仍有图书，不可删除！')
      }
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>

</style>
