const datosParking = {
  state: {
    datosP: {
      id: 0,
      name: ''
    }
  },
  mutations: {
    guardarDatosParking(state, data) {
      state.datosP = data
      if (!localStorage.getItem('paramEntrada')) {
        localStorage.setItem('paramEntrada', JSON.stringify(state));
      }
    },
    recuperarDatosParking(state, data) {
      let entrada = JSON.parse(localStorage.getItem('paramEntrada'));
      state.datosP = entrada.datosP
    },
    borrarDatosParking(state) {
      localStorage.removeItem('paramEntrada')
    }
  },
  actions: {
    ActionsDatosParking({ commit }, data) {
      commit('guardarDatosParking', data)
    },
    ObtenerDatosParking({ commit }, data) {
      commit('recuperarDatosParking', data)
    },
    eliminarDatosParking({ commit }, data) {
      commit('borrarDatosParking', data)
    }

  }
}

export default datosParking
