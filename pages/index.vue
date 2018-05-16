<template>
  <section class="container">
    <div id="app">
  <h1 color="primary">Open Weather Map</h1>
  <input v-model="query" type="text" @change="fetchAPI"/>
  <button @click="fetchAPI">Submit</button>
  <section v-if="exception">Sorry, API not accessible at this moment</section>
  <section v-else>
    <div v-if="fetching">Fetching Data...</div>
  <div v-else>
    <b>Current weather</b>
    <div v-for="weather in currentWeather" :key="weather.id">
      <img :src="getIcon(weather.icon)" alt="weather icon">
      <br>
      {{ weather.main }}, {{ weather.description }}
      </div>
      <br>
    <b>Next 5 day Forecast</b>
    <div v-for="forecast in forecasts" :key="forecast.dt">
      <hr><br>
      <b>As of: {{forecast.dt_txt}}</b>
    <div v-for="weather in forecast.weather" :key="weather.id">
      <img :src="getIcon(weather.icon)" alt="weather icon">
      <br>
      {{ weather.main }}, {{ weather.description }}
      </div><br>
      </div>
  </div>
</section>
</div>
  </section>
</template>

<script>
import Logo from "~/components/Logo.vue";
import { mapState, mapGetters } from "vuex";

export default {
  //TODO fetch apis with store???
  data() {
    return {
      query: ""
    };
  },
  computed: {
    ...mapState(["current", "forecasts", "fetching", "exception"]),
    currentWeather() {
      if (this.current === undefined) return;
      return this.current.weather;
    },
  },
  methods: {
    getIcon(icon) {
      return "https://openweathermap.org/img/w/" + icon + ".png";
    },
    fetchAPI() {
      if (this.query === "") return;
      this.$store.dispatch("fetchCurrent", this.query);
    }
  },
  //  watch: {
  //       query: function (val) {
  //           this.fetchAPI()
  //       }
  //   },
  components: {
    Logo
  }
};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>