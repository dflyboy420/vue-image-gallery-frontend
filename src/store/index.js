import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: {
      uris: [],
      files: [],
    },
  },
  mutations: {
    addImage(state, img) {
      state.images.uris.push(img.uri);
      state.images.files.push(img.file);
    },
  },
  actions: {},
  modules: {},
  getters: {
    imgNum(state) {
      return state.images.uris.length;
    },
  },
});
