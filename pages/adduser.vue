<template lang="pug">
  .add-user.centered-content
    user-detail-card(@create='createUser', :load='loading', transition="scroll-y-reverse-transition")
</template>

<script>
import UserDetailCard from '@/components/userDetailCard'
export default {
  name: 'AddUser',
  components: {
    UserDetailCard
  },
  data () {
    return {
      loading: false
    }
  },
  head () {
    return {
      title: 'La page pour créer des contacts',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Une page pour créer des contacts'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'La page pour créer des contacts'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Une page pour créer des contacts'
        }
      ]
    }
  },
  methods: {
    async createUser (user) {
      this.loading = true
      await this.$axios.post('api/users/create', user).then(({ data }) => {
        this.$store.dispatch('setNotif', { type: 'success', description: 'Contact créer' })
        this.$store.dispatch('getCountUser', this.$axios)
        this.$router.push({ name: 'users-id', params: { id: data.user._id } })
      }).catch((e) => {
        this.$store.dispatch('setNotif', { type: 'error', description: 'Erreur lors de la création du contact' })
        console.error('Erreur creation contact', e)
      })
      this.loading = false
    }
  }
}
</script>

<style>
</style>
