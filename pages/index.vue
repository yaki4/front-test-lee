<template lang="pug">
  .container.absolute
    h1 Bienvenue dans votre application de gestion de contacts
    h2 La base de données contient {{ $store.state.countUser }} contacts enregistrés
    .actions-grid
      v-card.actioncard.h-100(:to="'/users'", exact, tile)
        h2 Voir la liste des contacts
      v-card.actioncard(:to="'/adduser'", exact, tile)
        h2 Ajouter un contact au carnet d'adresse
      //- list-user(:users='users', :loading='loading', @fetchMore='getMoreUser')
      //- v-card
      //-   v-card-title.headline Test Creation type
      //-   v-card-text
      //-     v-text-field(v-model='titre', placeholder='titre')
      //-     v-select(:items='$store.state.types', item-text='titre', item-value='id')
      //-   v-card-actions
      //-     v-spacer
      //-       v-btn(color='secondary', @click='titre = null ') Annuler
      //-       v-btn(color='primary', @click='register') Ajouter type
      //- user-card
      //- user-table
</template>

<script>
// import UserCard from '@/components/userCard'
// import UserTable from '@/components/userTable'
export default {
  name: 'Index',
  components: {
    // UserCard,
    // UserTable
  },
  data () {
    return {
      titre: null
    }
  },
  created () {
    if (!this.$store.state.types.length === 0) {
      this.$store.commit('setLoading', true)
    }
  },
  methods: {
    // async register () {
    //   await this.$axios.post('/api/types/create', {
    //     titre: this.titre
    //   }).then((response) => {
    //     console.log('la reponse', response)
    //   }).catch((e) => {
    //     console.log(e.response.data.errors)
    //   })
    // }
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
