import Vuex from 'vuex'

const store = () => {
  return new Vuex.Store({
    state: {
      counter: 0,
      currentWeather: [{
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01n"
      }],
      forcast: []
    },
    mutations: {
      increment (state) {
        state.counter++
      }
    }
  })
}

export default store



