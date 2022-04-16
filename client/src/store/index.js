import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    isAuth: false,
  },
  mutations: {
    updateToken: (state, token) => state.token = token,
    loadToken: (state) => state.token = localStorage.token,
    setIsAuth: (state) => state.isAuth = !!state.token,
  },
  actions: {
    login({ commit }, token) {
      localStorage.token = token
      commit('updateToken', token)
      commit('setIsAuth')
    },
    logOut({ commit }) {
      localStorage.clear()
      commit('updateToken', null)
      window.location.reload()
    },
  },
  modules: {
  },
})
