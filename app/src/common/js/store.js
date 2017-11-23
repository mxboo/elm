import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
  count:1
};
const mutations={
  add(state){
    state.count+=1;
  },
  reduce(state){
    state.count-=1;
  },
  addCart(state,e) {
    console.log(e);
    if (!e.count) {
      Vue.set(e, 'count', 1)
    } else {
      e.count++;
    }
  }
}
export default new Vuex.Store({
  state,
  mutations
})


