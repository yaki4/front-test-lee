<template lang="pug">
  v-card(v-if='user', width='344', :to='{ name: "users-id", params: { id: user._id } }')
    v-list-item(two-line)
      v-list-item-content
        v-list-item-title.text-h5.mb-1 {{user.nom}} {{user.prenom}}
        v-list-item-subtitle {{type.titre}}
      v-list-item-avatar(tile, size='80', color='grey')
    v-card-actions
      v-btn(text, rouded) Voir la fiche du contact
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: { type: Object, required: true }
  },
  computed: {
    type () {
      return this.$store.state.types.find(e => e._id === this.user.type_id)
    }
  }

}
</script>

<style>
</style>
