import api from '@/api/planetsApi'

export default {
  state: {
    planetList: [],
    shapesList: [],
    colorsList: [],
    sizesList: []
  },
  getters: {
    getPlanetList (state) {
      return state.planetList
    },
    getShapesList (state) {
      return state.shapesList
    },
    getColorsList (state) {
      return state.colorsList
    },
    getSizesList (state) {
      return state.sizesList
    }
  },
  mutations: {
    setPlanetsList (state, value) {
      state.planetList = value
    },
    setShapesList (state, value) {
      state.shapesList = value
    },
    setColorsList (state, value) {
      state.colorsList = value
    },
    setSizesList (state, value) {
      state.sizesList = value
    }
  },
  actions: {
    GET_PLANETS_LIST ({ commit }, { success, params }) {
      api.getPlanetList((response) => {
        if (response.status === 200) {
          commit('setPlanetsList', response.data)
          success && success(response)
        } else {
          alert('list fetch error')
        }
      }, params)
    },
    GET_SHAPES ({ commit }) {
      api.getShapes(response => {
        if (response.status === 200) {
          commit('setShapesList', response.data)
        } else {
          alert('shapes api fetch error')
        }
      })
    },
    GET_COLORS ({ commit }) {
      api.getColors(response => {
        if (response.status === 200) {
          commit('setColorsList', response.data)
        } else {
          alert('color api fetch error')
        }
      })
    },
    GET_SIZES ({ commit }) {
      api.getSizes(response => {
        if (response.status === 200) {
          commit('setSizesList', response.data)
        } else {
          alert('color api fetch error')
        }
      })
    },
  }
}