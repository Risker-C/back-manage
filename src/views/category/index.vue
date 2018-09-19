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
          <img :src= "data.row.icon" alt="" style="width: 60px;height: 60px">
        </template>
      </el-table-column>
      <el-table-column
        prop="index"
        label="分类排序"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
          <el-button @click="handleClick(scope.row)" type="success" size="small">详情</el-button>
          <el-button @click="handleDelect(scope.row)" type="danger" size="small">删除</el-button>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      pn: 1,
      size: 5,
      count: 10
    }
  },
  methods: {
    handleClick (data) {
      console.log(data)
    },
    handleDelect (data) {
      console.log(data)
    },
    getData () {
      this.$axios.get('/category', {
        pn: this.pn,
        size: this.size
      }).then(res => {
        console.log(res)
        this.tableData = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    handleSizeChange (val) {
      console.log(`每页${val}条`)
      this.size = val
      this.getData()
    },
    handleCurrentChange (val) {
      console.log(`当前页:${val}`)
      this.pn = val
      this.getData()
    }
  },
  created () {
    this.$axios.get('/category').then(res => {
      this.count = res.data.data.length
      this.getData()
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>

</style>
