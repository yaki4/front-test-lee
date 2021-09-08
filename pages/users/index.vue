<template lang="pug">
  .users.centered-content
    div.mb2.flex
      h1.w-50 Liste des vos contacts
      v-select.filtertype(v-model='typeSelect', :items='$store.state.types', item-text='titre', item-value='_id', placeholder='Filtrer par type', @change='changeFilterType', clearable)
    .flex-wrap.space-around
      template(v-if='loading')
        v-skeleton-loader.mx-auto(max-width='344', type='list-item-two-line, image, table-tfoot', tile)
      template(v-else-if='listUser.length > 0')
        user-card.ma4(v-for='(user, index) in listUser', :key='index', :user='user')
        v-skeleton-loader.mx-auto(v-if='totalUser > listUser.length && !fetchMoreLoading', max-width='300', type='card', v-intersect='onIntersect', tile)
      template(v-else)
        h2 Aucun contact enregistré {{ typeSelect ? ' avec le type ' + $store.state.types.find(e => e._id === this.typeSelect).titre : '' }}
</template>

<script>
import UserCard from '@/components/userCard'
export default {
  name: 'Users',
  components: {
    UserCard
  },
  async asyncData ({ $axios, error }) {
    const { data } = await $axios.get('/api/users/user')
    return {
      totalUser: data.total,
      listUser: data.users,
      typeSelect: null,
      loading: false,
      fetchMoreLoading: false,
      page: 0
    }
  },
  methods: {
    async onIntersect (isIntersecting) {
      if (isIntersecting) {
        this.fetchMoreLoading = true
        this.page++
        try {
          const { data } = await this.$axios.get('/api/users/user?pagination=' + this.page)
          this.listUser.push(...data.users)
        } catch (e) {
          this.$store.dispatch('setNotif', { type: 'error', description: 'Erreur lors de la récupération des contacts' })
          console.error('erreur get more contacts pagination', e)
        }
      }
    },
    async changeFilterType () {
      this.page = 1
      this.loading = true
      let url = '/api/users/user'
      if (this.typeSelect) {
        url += '?type_id=' + this.typeSelect + '&page=' + this.page
      } else {
        url += '?page=' + this.page
      }
      try {
        await this.$axios.get(url)
          .then(({ data }) => {
            this.listUser = data.users
          })
      } catch (e) {
        console.error('erreur get contacts with filter', e)
      }
      this.loading = false
    }
  }
}
</script>

<style>
.filtertype {
  margin-top: 1rem;
}
.centered-content {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
