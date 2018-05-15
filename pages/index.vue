<template>
  <section class="container">
    <div id="app">
  <h1 color="primary">Open Weather Map</h1>
  <input v-model="cityName" type="text"/>
  <button @click="fetch">Submit</button>
  <section v-if="errored">Sorry, API not accessible at this moment</section>
  <section v-else>
    <div v-if="loading">Fetching Data... <textarea :value="this.prompt"></textarea></div>
  <div v-else>
    <b>Weather</b>:
    <span>{{ info[0].main }}, {{ info[0].description }} 
      <img :src="this.icon"/>
      </span>
  </div>
</section>
      <button @click="increment">{{ counter }}</button><br>
<section>
  {{currentWeather[0].main}}
</section>
</div>
  </section>
</template>

<script>
import Logo from "~/components/Logo.vue";
import { mapState } from 'vuex'

export default {
  fetch ({ store }) {
    store.commit('increment')
  },
  computed: mapState([
    'counter',
    'currentWeather'
  ]),
  data() {
    return {
      cityName: "London",
      prompt: "",
      icon: "https://openweathermap.org/img/w/10d.png",
      info: null,
      loading: true,
      errored: false
    };
  },

  filters: {
    currencydecimal(value) {
      return value.toFixed(2);
    }
  },
  components: {
    Logo
  },
  methods: {
    
    increment () { this.$store.commit('increment') },
    fetch() {
      if (this.cityName) {
        this.prompt = "";
        this.errored = false;
        this.loading = true;
        this.$axios
          .get(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
              this.cityName +
              "&units=metric&APPID=91aefe6fafd6a1fc3321d3af931272bc"
          )
          .then(response => (this.info = response.data.weather))
          .catch(error => {
            console.log(error);
            this.errored = true;
          })
          .finally(() => {
            this.loading = false;
            this.icon =
              "https://openweathermap.org/img/w/" + this.info[0].icon + ".png";
          });
      } else {
        this.prompt = "Please enter a city";
      }
    }
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