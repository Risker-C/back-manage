<template>
  <div>
    <h2>userParams组件</h2>
    <h3>ID:{{$route.params.id}}</h3>
    <h3>传入的value:{{$route.params.value}}</h3>
    <h4>$router.query:{{$route.query}}</h4>
    <h4>$router.param:{{$route.params}}</h4>
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
