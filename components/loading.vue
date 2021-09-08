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
    v-dialog(v-if='loading', v-model='loading', persistent, width='300', :overlay-opacity='0.95')
      v-card.relative.centered-content(height='15vh')
        v-card-title.headline Chargement en cours
        v-card-text.text-center
          v-progress-circular.headline(indeterminate)
</template>

<style scoped>
.loading-page {
    background: black;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
