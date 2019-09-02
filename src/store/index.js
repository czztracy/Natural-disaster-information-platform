import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import common from '@/store/modules/common'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    common
  },
  getters
})

export default store
