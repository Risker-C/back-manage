<template>
  <div>
    <h2>userQuery组件</h2>
    <h3>ID:{{$route.query.id}}</h3>
    <h3>传入的value:{{$route.query.value}}</h3>
    <h4>$router.query:{{$route.query}}</h4>
    <h4>$router.param:{{$route.param}}</h4>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      id: ''
    }
  }
}
</script>

<style scoped>

</style>
