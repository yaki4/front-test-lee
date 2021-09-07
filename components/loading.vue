<script>
export default {
  name: 'Loading',
  computed: {
    loading: {
      get () { return this.$store.state.loading },
      set (val) { this.$store.commit('setLoading', val) }
    }
  }
}
</script>

<template lang="pug">
  transition(name='slide')
    .loading-page(v-if='loading')
      .loading
        h1 LOADING
</template>

<style scoped>

</style>
