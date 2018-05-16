import Vuex from 'vuex'

const store = () => {
  return new Vuex.Store({
    state: {
      current: [],
      forecasts: [],
      fetching: false,
      exception: false
    },
    mutations: {
      current(state, current) {
        state.current = current;
      },
      clearCurrent(state) {
        state.current = [];
      },
      forecasts(state, forecasts) {
        state.forecasts = forecasts;
      },
      clearForecasts(state) {
        state.forecasts = [];
      },
      fetching(state, value) {
        state.fetching = value;
      },
      exception(state, value) {
        state.exception = value;
      }
    },
    actions: {
      fetchCurrent(context, query) {
        context.commit('fetching', true);
        context.commit('clearCurrent');
        context.commit('exception', false);
        context.fetching = true;
        //fetch current weather
        this.$axios
          .get(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            query +
            "&units=metric&APPID=91aefe6fafd6a1fc3321d3af931272bc"
          )
          .then(response => {
            (context.commit('current', response.data));
            context.commit('fetching', false);
          })
          .catch(error => {
            console.log(error);
            context.commit('fetching', false);
            context.commit('exception', true);
          })

          this.$axios
          .get(
            "https://api.openweathermap.org/data/2.5/forecast?q=" +
            query +
            "&units=metric&APPID=91aefe6fafd6a1fc3321d3af931272bc"
          )
          .then(response => {
            (context.commit('forecasts', response.data.list));
            context.commit('fetching', false);
          })
          .catch(error => {
            console.log(error);
            context.commit('fetching', false);
            context.commit('exception', true);
          })
      }
    }
  })
}

export default store
