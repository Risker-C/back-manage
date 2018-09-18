<template>
  <div class="mian">
    <div class="title clearfix">
      <h2 class="title-text">
        <span>云书后台操作系统</span>
        <el-dropdown class="user-handle">
          <div class="avatar-wrap">
            <img src="http://pbl.yaojunrong.com/FiC8ZOpJDzsI5-9HHZPmnAm1WGAo" v-if="true">
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handlePerson">
              个人中心
            </el-dropdown-item>
            <el-dropdown-item @click.native="handleLogout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </h2>

    </div>
    <div class="sidebar">
      <el-menu
        :router='true'
        :unique-opened='true'
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">用户管理</template>
            <el-menu-item index = "1-1" route="/layout/user">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">分类管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/layout/categoryList">分类列表</el-menu-item>
            <el-menu-item index="/layout/addCategory">添加分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">图书管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/layout/bookList">图书列表</el-menu-item>
            <el-menu-item index="/layout/addBook">添加图书</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-service"></i>
            <span slot="title">管理员用户</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/layout/managerList">管理员列表</el-menu-item>
            <el-menu-item index="/layout/editPassword">修改密码</el-menu-item>
            <el-menu-item index="/layout/editMessage">修改个人信息</el-menu-item>
            <el-menu-item index="/layout/addMessage">添加管理员</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-picture-outline"></i>
            <span slot="title">轮播图管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/layout/imgManage">轮播图列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">测试</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/layout/uploadImg">上传图片功能测试</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
  methods: {
    handlePerson () {

    },
    handleLogout () {
      this.$axios.get('/logout').then(res => {
        this.$router.replace('/')
        this.logout()
        this.$message({
          message: '退出登录成功',
          type: 'success'
        })
      })
    },
    ...mapMutations(['logout'])
  },
  computed: {
    routes () {
      return this.$router.matched
    },
    ...mapState(['state'])
  }
}
</script>

<style scoped>
  .sidebar{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 200px;
    padding-top: 50px;
    background-color: #545c64;
  }
  .body{
    margin: 20px 20px 0 220px;
  }
  .title {
    height: 60px;
    line-height: 60px;
    margin-left: 202px;
    border-bottom: 1px solid #f1f1f1;
  }

  .title h2 {
    text-align: center;
    font-weight: 400;
  }

  .user-handle {
    float: right;
    margin-right: 40px;
    margin-top: 5px;
  }

  .avatar-wrap {
    width: 50px;
    height: 50px;
    border: 1px solid #f1f1f1;
    border-radius: 4px;
  }

  .avatar-wrap img {
    display: block;
    width: 100%;
  }
</style>
