// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

// Store functionality
import modules from './modules'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

// Create a new store
const store = new Vuex.Store({
  modules,
  plugins: [vuexLocal.plugin],
  strict: debug
})

export default store