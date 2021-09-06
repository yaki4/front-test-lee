<template lang="pug">
  .user-table
    v-card(v-for='(card, index) in listUser')
      v-card-text
        div {{card.nom}} {{card.prenom}}
        v-btn(@click='deleteUser(card)') Supprimer
        v-btn(@click='updateUser(card)') Update
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
    async deleteUser (card) {
      await this.$axios.delete('api/users/' + card._id).then(({ data }) => {
        console.log('bien delete')
      }).catch((e) => {
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
