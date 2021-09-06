<template lang="pug">
  v-layout(column, justify-center, align-center)
    .container
      v-card
        v-card-title.headline Test Creation type
        v-card-text
          v-text-field(v-model='titre', placeholder='titre')
          v-select(:items='$store.state.types', item-text='titre', item-value='id')
        v-card-actions
          v-spacer
            v-btn(color='secondary', @click='titre = null ') Annuler
            v-btn(color='primary', @click='register') Ajouter type
      user-card
      user-table
</template>

<script>
import UserCard from '@/components/userCard'
import UserTable from '@/components/userTable'
export default {
  name: 'Index',
  components: {
    UserCard,
    UserTable
  },
  data () {
    return {
      titre: null
    }
  },
  methods: {
    async register () {
      await this.$axios.post('/api/types/create', {
        titre: this.titre
      }).then((response) => {
        console.log('la reponse', response)
      }).catch((e) => {
        console.log(e.response.data.errors)
      })
    }
  }
}
</script>
<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
