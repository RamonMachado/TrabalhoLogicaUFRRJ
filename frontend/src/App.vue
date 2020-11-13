<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title
        @click="$router.push('/')"
        class="display-1"
        style="cursor:pointer"
      >
        Truth Table Generator 2000
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer
      color="primary"
      padless
      fixed
    >
      <v-row
        justify="center"  
      >
        <v-btn
          color="white"
          :href="'https://github.com/RamonMachado/truthTableGenerator'"
          target="_blank"
          text
        >
          Veja o código-fonte no github&nbsp;
          <v-icon right>fab fa-github</v-icon>
        </v-btn>
      </v-row>

    </v-footer>

  </v-app>
</template>

<script>

export default {
  name: "App",
  data: () => ({
    //
  })
};
</script>
