<template lang="pug">
  .user-detail.centered-content(v-if='user')
    user-detail-card(:user='user', context='detail', @update='updateUser', :load='loading')
</template>

<script>
import UserDetailCard from '@/components/userDetailCard'
export default {
  name: 'UserDetail',
  components: {
    UserDetailCard
  },
  async asyncData ({ $axios, error, route }) {
    let dataUser
    try {
      dataUser = await $axios.get('/api/users/user?id=' + route.params.id)
    } catch (e) {
      error({ statusCode: 404, message: 'Usager inconnue' })
    }
    return {
      user: dataUser.data.user,
      editMode: false,
      loading: false
    }
  },
  methods: {
    async updateUser (user) {
      this.loading = true
      await this.$axios.put('api/users/' + this.user._id, { user }).then(({ data }) => {
        this.user = data
        this.$store.dispatch('setNotif', { type: 'success', description: 'Contact mis à jour' })
      }).catch((e) => {
        this.$store.dispatch('setNotif', { type: 'error', description: 'Erreur lors de la mise à jour du contact' })
        console.error('erreur update user', e)
      })
      this.loading = false
    }
  }
}
</script>

<style>
  .user-detail{
    top: 25%;
  }
  .centered-content {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
