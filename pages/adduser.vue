<template lang="pug">
  .add-user.centered-content
    user-detail-card(@create='createUser', :load='loading')
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
  .centered-content {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
