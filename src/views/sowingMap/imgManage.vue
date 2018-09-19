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
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      count: 100
    }
  },
  methods: {
    getData () {
      this.$axios.get('/swiper', {
        pn: this.pn,
        size: this.size
      }).then(res => {
        this.tableData = res.data.data
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleSizeChange (val) {
      this.size = val
      this.getData()
    },
    handelCurrentChange (val) {
      this.pn = val
      this.getData()
    }
  },
  created () {
    this.$axios.get('/swiper').then(res => {
      this.count = res.data.data.length
      console.log(res.data)
      this.getData()
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>

</style>
