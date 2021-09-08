export const state = () => ({
  loading: true,
  types: [],
  countUser: 0,
  showSnackbarGlobal: false,
  snackbarGlobalContent: {
    title: 'Titre par défaut',
    description: 'description',
    timeout: 4000,
    type: 'success'
  }
})

export const mutations = {
  setLoading (state, value) {
    state.loading = value
  },
  setTypes (state, value) {
    state.types = value
  },
  setShowSnackbarGlobal (state, payload) {
    state.showSnackbarGlobal = payload
  },
  setSnackbarGlobalContent (state, payload) {
    state.snackbarGlobalContent = payload
  },
  setCountUser (state, payload) {
    state.countUser = payload
  }
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch, state }, { app, req, res }) {
    await dispatch('getTypes', app.$axios)
    await dispatch('getCountUser', app.$axios)
    commit('setLoading', false)
  },
  setNotif ({ commit }, value) {
    commit('setSnackbarGlobalContent', value)
    commit('setShowSnackbarGlobal', true)
  },
  async getTypes ({ commit, dispatch }, axios) {
    await axios.get('/api/types/type').then(({ data }) => {
      commit('setTypes', data.types)
    }).catch((e) => {
      dispatch('setNotif', { type: 'error', description: 'Erreur lors de la récupération des types' })
      console.error('Erreur fetching type', e)
    })
  },
  async getCountUser ({ commit, dispatch }, axios) {
    await axios.get('/api/users/count').then(({ data }) => {
      commit('setCountUser', data.count)
    }).catch((e) => {
      dispatch('setNotif', { type: 'error', description: 'Erreur lors de la récupération du nombre de contact' })
      console.error('Erreur fetching number of users', e)
    })
  }
}
