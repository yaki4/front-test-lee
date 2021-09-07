<template lang="pug">
  .users
    div.mb2.flex
      h1.w-50 Liste des vos contacts
      v-select.filtertype(v-model='typeSelect', :items='$store.state.types', item-text='titre', item-value='_id', placeholder='Filtrer par type', @change='changeFilterType', clearable)
    .flex
      template(v-if='loading')
        v-skeleton-loader.mx-auto(max-width='344', type='list-item-two-line, image, table-tfoot', tile)
      template(v-else-if='listUser.length > 0')
        user-card(v-for='(user, index) in listUser', :key='index', :user='user')
      template(v-else)
        h2 Aucun contact enregistré
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
      listUser: data.users,
      typeSelect: null,
      loading: false,
      page: 1
    }
  },
  methods: {
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
        console.error(e)
      }
      // await this.$axios.get('/api/users/user?type_id=' + this.typeSelect + '&page=' + this.page)
      //   .then((data) => {
      //     this.listUser = data.users
      //   })
      this.loading = false
    }
  }
}
</script>

<style>
.filtertype {
  margin-top: 1rem;
}
</style>
