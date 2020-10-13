<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-text-field label="Digite aqui sua expressão lógica"></v-text-field>
        <v-btn @click="sendLogicExpression">Clique pra pedir a tabela pro backend</v-btn>
      </v-col>
    </v-row>
      <p>{{ tableString }}</p>
    <v-row>
      
    </v-row>
  </v-container>
</template>

<script>
const axios = require('axios');

export default {
  name: "HelloWorld",
  data: () => ({
    tableString: ""
  }),
  created(){
  },
  methods: {
    //makes a request to backend and sets the answer
    sendLogicExpression(){
      axios.get('http://localhost:3000/truthTable')
      .then((response) => {
        this.tableString = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
};
</script>
