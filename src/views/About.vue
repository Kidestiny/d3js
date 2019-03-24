<template>
  <div class="about">
    <div>
      <small>Raised</small>
      <md-button class="md-raised" v-on:click="addA ">{{d}}</md-button>
      <md-button class="md-raised" :md-ripple="false">{{a}}</md-button>
      <md-button class="md-raised md-primary">Primary</md-button>
      <md-button class="md-raised md-accent">Accent</md-button>
      <md-button class="md-raised" disabled>Disabled</md-button>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    a: 1,
    b: 2,
    c: 3
  }),
  computed: {
    d() {
      let f = this.a + this.b;
      return f + this.c;
    }
  },
  methods: {
    addA() {
      this.a++;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

