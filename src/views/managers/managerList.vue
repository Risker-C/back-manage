<template>
  <div>
    <el-breadcrumb separator="/" style="margin:20px 0">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="nickname"
        label="昵称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="createdTime"
        label="创建时间"
        align="center">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        align="center">
      </el-table-column>
      <el-table-column
        label="用户名"
        align="center">
        <template slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="top">
            <p>姓名：{{scope.row.nickname}}</p>
            <p>签名：{{scope.row.desc}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="nedium">{{scope.row.nickname}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="用户头像"
        align="center">
        <template slot-scope="tableData">
          <img :src="tableData.row.avatar" alt="加载失败" width="100px" height="100px" style="border-radius: 10%">
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button> -->
          <el-button @click="handleDelect(scope.row)" type="danger" size="small">删除</el-button>
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
        <el-button @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-pagination
      style="text-align:right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000"></el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      centerDialogVisible: false,
      pn: 1,
      size: 10,
      count: 100
    }
  },
  methods: {
    handleClick (data) {
      console.log(data)
    },
    handleDelect (data) {
      this.centerDialogVisible = true
    },
    getData () {
      this.$axios.get('/user', {
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
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>

</style>
