<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .mgform{
    margin: 50px auto;
    width: 500px;
  }
  .tableImg {
    width: 50px;
    border-radius: 20%
  }
  .clearfix::after {
    content: '';
    display: block;
    clear: both;
    width: 0;
    height: 0;
  }
</style>
