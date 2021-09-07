<template lang="pug">
  .user-table
    v-card(v-for='(card, index) in listUser')
      v-card-text
        div {{card.nom}} {{card.prenom}}
        v-btn(@click='deleteUser(card)') Supprimer
        v-btn(@click='updateUser(card)') Update
        v-btn(@click='testNotif') test tt
</template>

<script>
export default {
  name: 'UserTable',
  data () {
    return {
      loading: true,
      listUser: []
    }
  },
  async created () {
    await this.$axios.get('api/users/user').then(({ data }) => {
      this.listUser = data.users
    }).catch((e) => {
      console.error('error', e)
    })
    this.loading = false
  },
  methods: {
    testNotif () {
      this.$store.dispatch('setNotif', { type: 'success', description: 'Utilisateur supprimé' })
    },
    async deleteUser (card) {
      await this.$axios.delete('api/users/' + card._id).then(({ data }) => {
        this.$store.dispatch('setNotif', { type: 'success', description: 'Utilisateur supprimé' })
      }).catch((e) => {
        this.$store.dispatch('setNotif', { type: 'error', description: "Erreur lors de la suppression de l'utilisateur" })
        console.error('erreur', e)
      })
    },
    async updateUser (card) {
      await this.$axios.put('api/users/' + card._id).then(({ data }) => {
        console.log('bien update', data)
      }).catch((e) => {
        console.error('erreur', e)
      })
    }
  }
}
</script>

<style>
</style>
