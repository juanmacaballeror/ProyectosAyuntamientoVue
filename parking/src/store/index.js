import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import datosParking from './modules/datosParking'
import errorLog from './modules/errorLog'
import user from './modules/user'
import getters from './getters'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    errorLog,
    user,
    datosParking
  },
  getters
})

export default store
