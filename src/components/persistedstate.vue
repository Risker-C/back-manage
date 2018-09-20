<template>
  <div class="box">
    <h2>数据持久化功能测试</h2>
    <h3>sessionStorage会话存储</h3>
    <div>
      <button @click="setSessionStorage">添加sessionStorage</button>
      <button @click="getSessionStorage">获取sessionStorage</button>
      <input type="text" :value="sessionStorage">
    </div>
    <h3>localStorage永久存储</h3>
    <button @click="setLocalStorage">添加localStorage</button>
    <button @click="getLocalStorage">获取localStorage</button>
    <input type="text" :value="localStorage">
    <h3>插件store数据持久化</h3>
    <input type="text" v-model="id">
    <button @click="change">改变值</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sessionStorage: '',
      localStorage: '',
      id: ''
    }
  },
  methods: {
    setSessionStorage () {
      sessionStorage.setItem('key', 'sessionStorage')
    },
    getSessionStorage () {
      this.sessionStorage = sessionStorage.getItem('key')
    },
    setLocalStorage () {
      localStorage.setItem('name', 'localStorage')
    },
    getLocalStorage () {
      this.localStorage = localStorage.getItem('name')
    },
    change () {
      this.$store.commit('setID', this.id)
      this.$message.success('更改成功,页面关闭前有效')
    }
  },
  created () {
    let id = this.$store.state.ID
    if (id) {
      this.id = id
    } else {
      if (id === '') {
        this.$message.error('无信息')
      }
    }
  }
}
</script>

<style scoped>
  .box{
    text-align: center;
  }
</style>
