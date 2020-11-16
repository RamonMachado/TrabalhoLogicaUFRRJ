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
              Digite a expressão lógica no campo acima e clique no botão "Gerar Tabela Verdade".<br />
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
              Operadores
              <ul>
                <li>AND: ^</li>
                <li>OR: v</li>
                <li>IMPLIES: -&gt;</li>
                <li>IF AND ONLY IF: &lt;-&gt;</li>
              </ul>
              <br />
              Operadores Unários
              <ul>
                <li>NOT: ~</li>
              </ul>
            </v-card-text>
          </v-card>
      </v-col>

      <v-col cols="12" md="6" sm="12">
          <div v-if="truthTable">
              <div class="d-flex justify-center">
                <v-btn
                  class="ma-3" 
                  @click="resetTable"
                  text
                >
                    Remover Tabela
                </v-btn>
                <v-btn
                  class="ma-3" 
                  @click="share"
                  text
                  @click.stop="shareDialog = true"
                >
                    Compartilhar
                    <v-icon right>fas fa-share-alt</v-icon>
                </v-btn>

                <v-dialog
                  v-model="shareDialog"
                  max-width="400"
                >
                  <v-card>
                    <v-card-title>Compartilhar</v-card-title>
                    <v-card-text>
                      <v-text-field
                        :value="tableAddress"
                        readonly
                      >
                      </v-text-field>
                    </v-card-text>
               
                    <v-card-actions>
                      <v-btn
                        text
                        class="ma-3"
                        @click="copyLinkToClipboard"
                      >
                        Copiar Link
                        <v-icon right >far fa-copy</v-icon>
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn
                        class="ma-3"
                        color="primary"
                        @click="shareDialog = false"
                      >
                        Fechar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

              </div>
              <div class="d-flex justify-center mb-6">
                <v-data-table 
                  :headers="truthTable.header"
                  :items="truthTable.rows"
                  class="elevation-1"
                  :items-per-page="5"
                  multi-sort
                >
                  <template v-slot:body="{ items }">
                    <tbody>
                      <tr :class="item[Object.keys(item)[Object.keys(item).length - 1]] == true ? 'custom-highlight-row' : ''" v-for="(item, index) in items" :key="Object.keys(item)[0]+index">
                        <td v-for="col in item" :key="Object.keys(col)[0]">
                          {{ col }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-data-table>
              </div>
          </div>
          <div v-if="tableError">
            <v-alert
              color="red"
              dismissible
              elevation="7"
              icon=""
              type="error"
            >
              {{ errorMessage }}
            </v-alert>
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
      mainAddress: process.env.VUE_APP_MAIN_ADDRESS,
      logicExpression: this.$route.query.logicExpression ? this.$route.query.logicExpression : "",
      truthTable: null,
      errorMessage: "",
      tableError: false,
      shareDialog: false
    }
  },
  created(){
    this.getTableOnLoad();
  },
  methods: {
    //makes a request to backend and sets the answer
    sendLogicExpression(){
      this.tableError = false;
      let expression = this.logicExpression;
      let query = {...this.$route.query};
      query.logicExpression = this.logicExpression;
      this.$router.replace({query: query});
      axios.get(process.env.VUE_APP_REQUEST_TABLE_BACKEND + '/truthTable', {params: {expression}})
      .then((response) => {
        this.truthTable = response.data;
      })
      .catch((error) => {
        console.log(error);
        if(error.response){
          this.truthTable = null;
          this.errorMessage = error.response.data.message;
          this.tableError = true;
        }
      });
    },
    resetTable(){
      this.truthTable = null;
      this.logicExpression = "";
    },
    getTableOnLoad(){
      if(this.logicExpression != ""){
        this.sendLogicExpression();
      }
    },
    copyLinkToClipboard(){
      navigator.clipboard.writeText(this.tableAddress);
    }
  },
  computed: {
    tableAddress(){
      return this.mainAddress +  this.$route.fullPath;
    }
  }
};
</script>

<style scoped>
.custom-highlight-row{
  background-color: rgb(209, 255, 209)
}
</style>