<template>
  <v-container>
    <v-row class="d-flex justify-center mb-6">
      <v-col cols="12" sm="10">
        <v-text-field 
          label="Digite aqui sua expressão lógica"
          type="text"
          v-model="logicExpression"
        >
        </v-text-field>
        <div class="d-flex justify-center mb-6">
          <v-btn 
            @click="sendLogicExpression"
          >
            Gerar Tabela Verdade
          </v-btn>
        </div>
      </v-col> 
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex justify-center mb-6">
        <v-data-table
          v-if="truthTable"
          :headers="truthTable.header"
          :items="truthTable.rows"
          class="elevation-1"
          :items-per-page="5"
        >
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const axios = require('axios');

export default {
  name: "HelloWorld",
  data(){
    return {
      logicExpression: "",
      truthTable: null}
  },
  created(){
  },
  methods: {
    //makes a request to backend and sets the answer
    sendLogicExpression(){
      let expression = this.logicExpression;
      axios.get('https://truthtablegenerator2000-ramon.rj.r.appspot.com/truthTable', {params: {expression}})
      .then((response) => {
        this.truthTable = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
};
</script>
