<template lang="pug">
  .add-type.centered-content
    v-card
      v-card-title
        h1 Création d'un type de contact
      v-card-text
        v-text-field(v-model='type', :disabled='loading')
        span.error--text(v-if='type && valid') Ce type existe déjà
      v-card-actions
        v-spacer
        v-btn(color='secondary', @click='cancel') Annuler
        v-btn(color='primary', @click='createType', :disabled='valid || loading') Créer le type
</template>

<script>
export default {
  name: 'AddType',
  data () {
    return {
      loading: false,
      type: null
    }
  },
  computed: {
    valid () {
      let temp = true
      if (this.type && !this.$store.state.types.find(e => e.titre.toLowerCase().normalize() === this.type.toLowerCase().normalize())) {
        temp = false
      }
      return temp
    }
  },
  head () {
    return {
      title: 'La page pour créer des types',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Une page pour créer des types'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'La page pour créer des types'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Une page pour créer des types'
        }
      ]
    }
  },
  methods: {
    cancel () {
      this.type = null
    },
    async createType () {
      this.loading = true
      await this.$axios.post('api/types/create', { titre: this.type }).then(({ data }) => {
        this.$store.dispatch('setNotif', { type: 'success', description: 'Type créer' })
        this.$store.dispatch('getTypes', this.$axios)
        this.type = null
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
