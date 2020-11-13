<template>
  <v-container>
    <v-row class="d-flex justify-center mb-6">
      <v-col cols="12"  md="6" sm="12">
          <v-text-field
            label="Digite aqui sua expressão lógica"
            type="text"
            v-model="logicExpression"
          >
          </v-text-field>

          <v-btn 
            @click="sendLogicExpression"
            color="primary"
          >
            Gerar Tabela Verdade
          </v-btn>

          <v-card
            class="my-6"
          >
            <v-card-title>
              Como usar
            </v-card-title>
            <v-card-text>
              Digite a expressão lógica no campo acima e clique no botão "Gerar Tabela".<br />
              <br />
              Regras
              <ul>
                <li>Variáveis precisam ser maiúsculas.</li>
                <li>Variáveis podem ter nomes de A a Z, com a exceção da letra V.</li>
                <li>A prioridade de interpretação será sempre da direita para a esquerda.</li>
                <li>É necessário SEMPRE colocar parênteses para definir prioridades:
                    <ul>
                      <li>A^BvC - ERRADO</li>
                      <li>(A^B)vC - CERTO</li>
                    </ul>
                </li>
              </ul>
              <br />
              Operadores Suportados
              <ul>
                <li>^ - AND</li>
                <li>v - OR</li>
                <li>-&gt; - IMPLIES</li>
                <li>&lt;-&gt; - IF AND ONLY IF</li>
              </ul>
            </v-card-text>
          </v-card>
      </v-col>

      <v-col cols="12" md="6" sm="12">
        <div v-if="truthTable">
            <v-data-table 
              :headers="truthTable.header"
              :items="truthTable.rows"
              class="elevation-1"
              :items-per-page="5"
            >
            </v-data-table>
            <div class="d-flex justify-center mb-6">
            <v-btn
              class="ma-6" 
              @click="resetTable"
              color="primary"
            >
                Remover Tabela
            </v-btn>
            <v-btn
              class="ma-6 white--text" 
              @click="share"
              color="primary"
            >
                Compatilhar
                <i class="fas fa-share-alt"></i>
            </v-btn>
            </div>
        </div>
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
    },
    resetTable(){
      this.truthTable = null;
      this.logicExpression = "";
    }
  }
};
</script>
