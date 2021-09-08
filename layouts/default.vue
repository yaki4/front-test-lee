<template lang="pug">
  v-app()
    notification-snackbar
    v-app-bar(app, height='80', hide-on-scroll, flat, dark)
      v-app-bar-nav-icon(@click='drawer = true')
      v-toolbar-title.pointer(@click='$router.push({ name: "index" })') Contact manager v1
    v-navigation-drawer(v-model='drawer', app, absolute, temporary)
      v-list(dense, nav)
        v-list-item(to='/users/', exact)
          v-list-item-icon
            v-icon mdi-folder-account
          v-list-item-content
            v-list-item-title Tout mes contacts
        v-list-item(to='/adduser/', exact)
          v-list-item-icon
            v-icon mdi-account-plus
          v-list-item-content
            v-list-item-title Ajouter un contact
        v-list-item(to='/addtype/', exact)
          v-list-item-icon
            v-icon mdi-briefcase-plus
          v-list-item-content
            v-list-item-title Ajouter un type
    v-main
      v-container(fill-height)
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
