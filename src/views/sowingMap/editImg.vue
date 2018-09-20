<template>
  <div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      formData: {

      }
    }
  },
  methods: {
    getData () {
      this.$axios.get(`/swiper/${this.id}`).then(res => {
        this.formData = res.data.data
      })
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getData()
  }
}
</script>

<style scoped>

</style>
