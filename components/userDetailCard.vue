<template lang="pug">
  .user-card
    v-card
      v-card-title.headline {{ contextContact }}
      v-card-text
        v-form(ref='formulaireContact')
          v-text-field(v-model='nom', placeholder='nom du contact', required, :rules='nomRules')
          v-text-field(v-model='prenom', placeholder='prénom du contact', required, :rules='prenomRules')
          v-text-field(v-model='email', placeholder='email du contact', required, :rules='emailRules')
          v-text-field(v-model='telephone', placeholder='514XXXXXX', required, :rules='telephoneRules')
          v-select(v-model='selectType', :items='$store.state.types', item-text='titre', item-value='_id', required, :rules='typeRules')
      v-card-actions
        //- v-spacer
        v-btn(color='secondary', @click='cancel') Annuler
        v-btn(color='primary', @click='register', :disabled='valid || loading') Ajouter type
</template>

<script>
export default {
  name: 'UserCard',
  data () {
    return {
      loading: false,
      nom: null,
      nomRules: [
        v => !!v || 'Nom est obligatoire'
      ],
      prenom: null,
      prenomRules: [
        v => !!v || 'Prenom est obligatoire'
      ],
      email: null,
      emailRules: [
        v => !!v || 'E-mail est obligatoire',
        v => /.+@.+/.test(v) || 'E-mail doit être valide'
      ],
      telephone: null,
      telephoneRules: [
        v => !!v || 'Telephone est obligatoire',
        // eslint-disable-next-line no-useless-escape
        v => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(v) || 'Téléphone invalide'
      ],
      selectType: null,
      typeRules: [
        v => !!v || 'Un type de profil doit être choisit'
      ]
    }
  },
  computed: {
    contextContact () {
      return "Création d'une fiche contact"
    },
    valid () {
      if (this.nom && this.prenom && this.telephone && this.selectType && this.email) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    async register () {
      this.loading = true
      if (this.$refs.formulaireContact.validate()) {
        await this.$axios.post('/api/users/create', {
          nom: this.nom,
          prenom: this.prenom,
          email: this.email,
          telephone: this.telephone,
          type: this.selectType
        }).then((response) => {
          console.log('la reponse', response)
        }).catch((e) => {
          console.log(e.response.data.errors)
        })
        this.loading = false
      } else {
        this.loading = false
      }
    },
    cancel () {
      console.log('cancel')
    }
  }
}
</script>

<style>
</style>
