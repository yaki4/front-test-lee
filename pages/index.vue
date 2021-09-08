<template lang="pug">
  .container
    h1 Bienvenue dans votre application de gestion de contacts
    h2 La base de données contient {{ $store.state.countUser }} contacts enregistrés
    .actions-grid
      v-card.actioncard.h-100(:to="'/users'", exact, tile)
        h2 Voir la liste des contacts
      v-card.actioncard(:to="'/adduser'", exact, tile)
        h2 Ajouter un contact au carnet d'adresse
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      titre: null
    }
  },
  mounted () {
    if (!this.$store.state.types.length === 0) {
      this.$store.commit('setLoading', true)
    }
  }
}
</script>
<style scoped>
.container {
  top: 25%;
}
.actions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0px 9px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.actioncard {
  height: 25vh;
}
</style>
