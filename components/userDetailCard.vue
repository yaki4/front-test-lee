<template lang="pug">
  .user-card
    v-dialog(v-model='loading', persistent, width='300', :overlay-opacity='0.95')
      v-card.relative.centered-content(height='15vh')
        v-card-title.headline Chargement en cours
        v-card-text
          v-progress-circular.headline(indeterminate)
    v-dialog(v-model='trash', persistent, :overlay-opacity='0.60')
      v-card.relative.centered-content(height='15vh')
        v-card-title.headline Êtes-vous certains de vouloir supprimer ce contact ?
        v-card-actions
          v-spacer
          v-btn(color='secondary', @click='trash = !trash', :disabled='loading') Annuler
          v-btn(color='primary', @click.once='deleteUser', :disabled='loading') Supprimer le contact
    v-card(transition="scroll-y-reverse-transition")
      v-card-title
        .flex
          h1 {{ contextContact }}
          v-menu(v-if='context !== "creation"', rounded)
            template(v-slot:activator="{ attrs, on }")
              v-btn.ma4(icon, small, v-on='on', v-bind='attrs')
                v-icon mdi-dots-vertical
            v-list
              v-list-item
                v-tooltip(bottom)
                  template(v-slot:activator='{ on: tooltip }')
                    v-btn.ma4(icon, small, @click='trash = !trash', v-on='tooltip')
                      v-icon mdi-delete
                  span Supprimer le contact
              v-list-item
                v-tooltip(bottom)
                  template(v-slot:activator='{ on: tooltip }')
                    v-btn.ma4(icon, small, @click='editable = !editable', v-on='tooltip')
                      v-icon {{ editable ? 'mdi-pencil' : 'mdi-pencil-off'}}
                  span Modifier le contact
      v-card-text
        v-form(ref='formulaireContact')
          v-text-field(v-model='nom', placeholder='nom du contact', required, :rules='nomRules', :disabled='editable', :outlined='editable', label='nom')
          v-text-field(v-model='prenom', placeholder='prénom du contact', required, :rules='prenomRules', :disabled='editable', :outlined='editable', label='prenom')
          v-text-field(v-model='email', placeholder='email du contact', required, :rules='emailRules', :disabled='editable', :outlined='editable', label='email')
          v-text-field(v-model='telephone', placeholder='514XXXXXX', required, :rules='telephoneRules', :disabled='editable', :outlined='editable', label='telephone')
          v-select(v-model='selectType', :items='$store.state.types', item-text='titre', item-value='_id', required, :rules='typeRules', :disabled='editable', :outlined='editable', label='type')

      v-card-actions(v-if='context === "creation" || !editable')
        v-spacer
        v-btn(color='secondary', @click='cancel') Annuler
        v-btn(color='primary', @click='register', :disabled='valid || loading') {{ context === 'creation' ? 'Créer fiche contact' : 'Mettre à jour cette fiche'}}
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: { required: false, type: Object, default: () => null },
    context: { required: false, type: String, default: 'creation' },
    load: { required: false, type: Boolean, default: false }
  },
  data () {
    return {
      trash: false,
      editable: true,
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
      return this.context === 'detail' ? 'Fiche contact de ' + this.user.nom + ' ' + this.user.prenom : "Création d'une fiche contact"
    },
    valid () {
      if (this.nom && this.prenom && this.telephone && this.selectType && this.email) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    load: {
      immediate: true,
      handler (newVal) {
        this.loading = newVal
        if (newVal) {
          this.editable = false
        }
      }
    },
    context: {
      immediate: true,
      handler (newVal) {
        if (newVal === 'creation') {
          this.editable = false
        }
      }
    },
    user: {
      deep: true,
      immediate: true,
      handler (newVal) {
        if (newVal) {
          this.editable = true
          this.nom = newVal.nom
          this.prenom = newVal.prenom
          this.telephone = newVal.telephone
          this.email = newVal.email
          this.selectType = newVal.type_id
        }
      }
    }
  },
  methods: {
    deleteUser () {
      this.loading = true
      this.$emit('delete')
    },
    register () {
      this.editable = true
      const user = {
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        telephone: this.telephone,
        type: this.selectType
      }
      const emitText = this.context === 'creation' ? 'create' : 'update'
      this.$emit(emitText, user)
    },
    cancel () {
      if (this.context !== 'creation') {
        this.editable = true
      }
      this.nom = this.user ? this.user.nom : null
      this.prenom = this.user ? this.user.prenom : null
      this.email = this.user ? this.user.email : null
      this.telephone = this.user ? this.user.telephone : null
      this.selectType = this.user ? this.user.type_id : null
    }
  }
}
</script>

<style>
</style>
