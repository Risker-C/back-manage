<template>
  <div class="box">
    <h3>路由跳转功能测试页面</h3>
    <div class="lickList">
      <h4>使用router-link跳转</h4>
      <div><router-link to='useQuery?id=1'>useQuery</router-link></div>
      <div><router-link to='useParams/2'>useParams</router-link></div>
      <h4>使用button跳转</h4>
      <div>
        <button @click="jump1">useQuery1</button>
      </div>
      <div>
        <button @click="jump2">useParams2</button>
      </div>
    </div>
    此处输入value:<input type="text" v-model="value">
    <div class="route">
      <h1>组件</h1>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 1
    }
  },
  methods: {
    jump1 () {
      this.$router.push(`useQuery?id=2&value=${this.value}`)
    },
    jump2 () {
      this.$router.push(`useParams/${this.value}`)
    }
  }
}
</script>

<style scoped>
  .box {
    text-align: center;
  }
  .linkList {
    margin: 30px auto;
  }
  .route {
    width: 80%;
    margin: 50px auto;
    border:1px solid red;
    height: 300px;
  }
</style>
