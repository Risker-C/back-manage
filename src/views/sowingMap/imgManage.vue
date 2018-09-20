<template>
  <div>
    <el-breadcrumb separator="/" style="margin:20px 0">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图列表页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="tableData"
      style="width=100%"
      border>
      <el-table-column align="center" label="标题" prop="title"></el-table-column>
      <el-table-column align="center" label="类别" prop="sort"></el-table-column>
      <el-table-column align="center" label="优先级" prop="index"></el-table-column  >
      <el-table-column
        align="center"
        label="图片"
        prop="index"
        width="400">
        <template slot-scope="scope" >
          <img :src="scope.row.img" alt="图片加载失败" style="height:100px">
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="primary"
            @click="handleEdit(scope.row._id)">编辑</el-button>
          <el-button
            size="medium"
            type="danger"
            @click="handleTips(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="删除管理员提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>执行删除操作，将不可撤销，是否确认继续删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">取 消</el-button>
        <el-button @click="handleDelet">确 定</el-button>
      </span>
    </el-dialog>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handelCurrentChange"
      :page-sizes="[5, 10, 20]"
      :page-size="size"
      style="text-align: right;"
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
      pn: 1,
      size: 10,
      count: 100,
      centerDialogVisible: false,
      ids: ''
    }
  },
  methods: {
    getData () {
      this.$axios.get('/swiper', {
        pn: this.pn,
        size: this.size
      }).then(res => {
        this.tableData = res.data.data
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    handleEdit (id) {
      this.$router.push(`editImg/?id=${id}`)
    },
    handleSizeChange (val) {
      this.size = val
      this.getData()
    },
    handelCurrentChange (val) {
      this.pn = val
      this.getData()
    },
    handleTips (val) {
      this.ids = val
      this.centerDialogVisible = true
    },
    handleDelet () {
      this.$axios.post('/swiper/delete', {
        ids: this.ids
      }).then(res => {
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
    }
  },
  created () {
    this.$axios.get('/swiper').then(res => {
      this.count = res.data.count
      this.getData()
    }).catch(err => {
      this.$message.error(err.msg)
    })
  }
}
</script>

<style scoped>

</style>
