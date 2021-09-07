<template lang="pug">
  v-app()
    notification-snackbar
    v-app-bar(app, height='80', hide-on-scroll, flat, dark)
      v-app-bar-nav-icon(@click='drawer = true')
      v-toolbar-title Contact manager v1
    v-navigation-drawer(v-model='drawer', app, absolute, temporary)
      v-list
    v-main
      v-container
        nuxt
    v-footer(app)
      span &copy; {{ new Date().getFullYear() }}
</template>

<script>
import NotificationSnackbar from '@/components/notificationSnackbar'
export default {
  components: {
    NotificationSnackbar
  },
  data () {
    return {
      drawer: false
    }
  }
}
</script>
