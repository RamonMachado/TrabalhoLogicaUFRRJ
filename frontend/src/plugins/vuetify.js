import Vue from "vue";
import Vuetify from "vuetify/lib";
import pt from "vuetify/es5/locale/pt";

Vue.use(Vuetify, {
  iconfont: 'fa'
});

export default new Vuetify({
  lang: {
    locales: { pt },
    current: "pt"
  },
  icons: {
    iconfont: "fa"
  }
});
