<template lang="pug">
  .user-detail.centered-content(v-if='user')
    v-expand-transition
      user-detail-card(:user='user', context='detail', @update='updateUser', @delete='deleteUser', :load='loading')
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
      error({ statusCode: 500, message: 'Usager inconnue' })
    }
    if (!dataUser) {
      error({ statusCode: 404, message: 'Usager inconnue' })
    }
    // console.log(dataUser)
    return {
      user: dataUser && dataUser.data && dataUser.data.user ? dataUser.data.user : null,
      editMode: false,
      loading: false
    }
  },
  head () {
    return {
      title: 'Fiche Contact de ' + this.user.nom + ' ' + this.user.prenom,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Une page pour faire des modifications sur la fiche du contact'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Fiche Contact de ' + this.user.nom + ' ' + this.user.prenom
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Une page pour faire des modifications sur la fiche du contact'
        }
      ]
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
      this.$nextTick(() => {
        this.loading = false
      })
    },
    async deleteUser () {
      this.loading = true
      await this.$axios.delete('api/users/' + this.user._id).then(({ data }) => {
        this.$store.dispatch('getCountUser', this.$axios)
        this.$store.dispatch('setNotif', { type: 'success', description: 'Contact supprimé' })
        this.$router.push({ name: 'users' })
      }).catch((e) => {
        this.$store.dispatch('setNotif', { type: 'error', description: 'Erreur lors de la suppression du contact' })
        console.error('erreur update user', e)
      })
      this.$nextTick(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style>
  .user-detail{
    top: 25%;
  }
</style>
