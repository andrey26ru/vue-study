export default {
  state: {
    loading: false,
    error: null
  },
  mutations: {
    LOADING_SET: (state, payload) => (state.loading = payload),
    ERROR_SET: (state, payload) => (state.error = payload),
    ERROR_CLEAR: state => (state.error = null)
  },
  actions: {
    LOADING_SET: ({ commit }, payload) => commit("LOADING_SET", payload),
    ERROR_SET: ({ commit }, payload) => commit("ERROR_SET", payload), // запускаем мутацию со значением payload
    ERROR_CLEAR: ({ commit }) => commit("ERROR_CLEAR")
  },
  getters: {
    LOADING: state => state.loading,
    ERROR: state => state.error
  }
};
