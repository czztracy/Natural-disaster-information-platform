
const common = {
  state: {
    title: sessionStorage.getItem('title')
  },
  mutations: {
    SET_TITLE: (state, title) => {
      sessionStorage.setItem('title', title)
      state.title = title
    }
  },
  actions: {
    GET_TITLE ({ commit }, title) {
      commit('SET_TITLE', title)
    }
  }
}

export default common
