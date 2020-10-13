<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const axios = require('axios');

export default {
  name: "HelloWorld",
  data: () => ({
  }),
  created(){
    this.makeRequest();
  },
  methods: {
    makeRequest(){
      console.log("blabla");
      axios.get('http://localhost:3000/truthTable')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
};
</script>
