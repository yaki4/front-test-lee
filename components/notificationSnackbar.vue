<template lang="pug">
  .success-snackbar
    v-snackbar(:color='snackBarStateContent.type', bottom, v-model='snackBarState', :timeout='5000', fixed)
      div.flex.items-center(v-if='snackBarStateContent')
        div.mr2()
          v-icon {{snackBarStateContent.type === 'error' ? 'mdi-alert-circle' : 'mdi-check-circle'}}
        div
          div.f7.i(v-if='snackBarStateContent.type === "success"') Succès
          div.f7.i(v-else-if='snackBarStateContent.type === "error"') Erreur
          div.f6(v-if='snackBarStateContent.description') {{snackBarStateContent.description}}
      template(v-slot:action='{ attrs }')
        v-btn(icon, small, v-bind='attrs', @click='snackBarState = false')
          v-icon mdi-close
</template>

<script>
export default {
  name: 'NotificationSnackbar',
  computed: {
    snackBarState: {
      get () { return this.$store.state.showSnackbarGlobal },
      set (val) { this.$store.commit('setShowSnackbarGlobal', val) }
    },
    snackBarStateContent: {
      get () { return this.$store.state.snackbarGlobalContent },
      set (val) { this.$store.commit('setSnackbarGlobalContent', val) }
    }
  },
  watch: {
  }
}
</script>

<style>
</style>
