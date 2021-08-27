// Following this guide:
// https://vuejsdevelopers.com/2017/05/15/vue-js-what-is-vuex

import { createStore } from "vuex";

export default createStore({
  state () {
    return {
      papers: []
    }
  },
  getters: {
    getPapers(state) {
      return state.papers
    }
  },
  mutations: {
    updatePapers(state, new_papers) {
      state.papers = new_papers
    }
  },
  actions: {}
});
