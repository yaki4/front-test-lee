export const state = () => ({
  loading: false,
  types: null
})

export const mutations = {
  setLoading (state, value) {
    state.loading = value
  },
  setTypes (state, value) {
    state.types = value
  }
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch, state }, { app, req, res }) {
    await app.$axios.get('/api/types/type').then(({ data }) => {
      commit('setTypes', data.types)
    }).catch((e) => {
      console.error('ERROR', e)
    })
  }
}
