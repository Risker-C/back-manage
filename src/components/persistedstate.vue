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
  </div>
</template>

<script>
export default {
  data () {
    return {
      sessionStorage: '',
      localStorage: ''
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
    }
  }
}
</script>

<style scoped>
  .box{
    text-align: center;
  }
</style>
