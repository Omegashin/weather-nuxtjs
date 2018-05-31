<template>
  <section class="container">
    <div id="app">
  <h1 color="primary">Open Weather Map</h1>
  <input v-model="query" type="text" @keydown.enter="fetchAPI"/>
  <button @click="fetchAPI">Submit</button>
  <br>
  {{this.location}}
  <br>
  <section v-if="exception">Sorry, API not accessible at this moment</section>
  <section v-else>
    <div v-if="fetching">Fetching Data...</div>
  <div v-else>
    <b>Current weather</b>
    <div v-for="weather in currentWeather" :key="weather.id">
      <img :src="getIcon(weather.icon)" alt="weather icon">
      <br>
      {{ weather.main }}, {{ weather.description }}
      <br>
      Temprature: {{current.main.temp}}&deg;C | {{current.main.temp_min}}&deg;C, {{current.main.temp_max}}&deg;C
      <br>
      Wind: {{current.wind.speed}} m/s, {{current.wind.deg}}&deg;
      <br>
      Sunrise: {{current.sys.sunrise}}, Sunset: {{current.sys.sunset}}
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
      <br>
      Temprature: {{current.main.temp}}&deg;C | {{current.main.temp_min}}&deg;C, {{current.main.temp_max}}&deg;C
      <br>
      Wind: {{current.wind.speed}} m/s, {{current.wind.deg}}&deg;
      <br>
      Sunrise: {{current.sys.sunrise}}, Sunset: {{current.sys.sunset}}
      </div><br>
      </div>
  </div>
</section>
</div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  created() {
    this.$store.dispatch("fetchLocation");
    this.$store.dispatch("fetchCurrent", this.location);
  },
  data() {
    return {
      query: ""
    };
  },
  computed: {
    ...mapState(["location", "current", "forecasts", "fetching", "exception"]),
    currentWeather() {
      if (this.current === undefined) return;
      return this.current.weather;
    }
  },
  methods: {
    getIcon(icon) {
      return "https://openweathermap.org/img/w/" + icon + ".png";
    },
    fetchAPI() {
      if (this.query === "") return;
      this.$store.dispatch("fetchCurrent", this.query);
    }
  }
};
</script>

<style>
body {
  background-color: #000;
  color: white;
}

img {
  background-color: #fff;
  border-radius: 6px;
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>