<template>
  <div>
    <el-breadcrumb separator="/" style="margin:20px 0">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书列表页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="title"
        label="书名"
        align="center">
      </el-table-column>
      <el-table-column
        label="书籍头图"
        align="center">
        <template slot-scope="data">
          <img :src="data.row.img" style="border-radius: 10%" alt="" width="100px">
        </template>
      </el-table-column>
      <el-table-column
        prop="index"
        label="书籍排序"
        align="center">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row._id)" type="primary" size="small">编辑</el-button>
          <el-button @click="handleTips(scope.row._id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="删除图书提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>执行删除操作，将不可撤销，是否确认继续删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">取 消</el-button>
        <el-button @click="handleDelect">确 定</el-button>
      </span>
    </el-dialog>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5,10,20,30]"
      :page-size="size"
      style="text-align:right"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      centerDialogVisible: false,
      currentpage: 10,
      pn: 1,
      size: 5,
      count: 300,
      id: ''
    }
  },
  methods: {
    handleClick (data) {
      this.$router.push(`editBook/?id=${data}`)
    },
    handleDelect () {
      this.$axios.delete(`/book/${this.id}`).then(res => {
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
      this.$axios.get('/book', {
        pn: this.pn,
        size: this.size
      }).then(res => {
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
      this.id = val
      this.centerDialogVisible = true
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>

</style>
