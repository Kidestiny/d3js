<template>
  <div id="app">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <span class="md-title">基于vue+d3.js的可视化系统</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          dashboard({{superstore.length}}条数据)
        </md-toolbar>

        <md-list>
          <md-list-item v-on:click="linkTo('/')">
            <span class="md-list-item-text">piechart</span>
          </md-list-item>

          <md-list-item v-on:click="linkTo('/histogram')">
            <span class="md-list-item-text">histogram</span>
          </md-list-item>

          <md-list-item v-on:click="linkTo('/about')">
            <span class="md-list-item-text">Map</span>
          </md-list-item>

          <md-list-item>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>
<script>
import Vue from "vue";
import router from "./router";
import VueMaterial from "vue-material";
import * as d3 from "d3";
import config from "./config";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.use(VueMaterial);
Vue.config.productionTip = false;

export default {
  name: "app",
  data: () => ({
    superstore: []
  }),
  methods: {
    linkTo(src, query, params) {
      this.$router.push({
        path: src,
        params: params || {},
        query: query || {}
      });
    }
  },
  router,
  render: h => h(this),
  mounted: async function() {
    this.$data.superstore = await d3.csv(config.dataUrl);
    console.log(this.$data.superstore[0]);
  }
};
</script>

<style <style lang="scss">
.md-app {
  min-height: 100vh;
  border: 1px solid rgba(#000, 0.12);
}
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
.tooltip {
  position: absolute;
  font: 14px consolas;
  background-color: #aaa;
  border: 1px;
  border-radius: 4px;
  text-align: center;
  min-width: 100px;
  min-height: 70px;
  padding: 5px;
  /*垂直居中*/
  display: table-cell;
  vertical-align: middle;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
