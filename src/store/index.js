import _ from "lodash";
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
    clear(state) {
      state.images = {
        uris: [],
        files: [],
      };
    },
  },
  actions: {},
  modules: {},
  getters: {
    imgNum(state) {
      return state.images.uris.length;
    },
    formData(state) {
      const fd = new FormData();
      _.forEach(state.images.files, (f) => fd.append("img", f));
      return fd;
    },
  },
});
