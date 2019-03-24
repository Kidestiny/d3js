<template>
  <div class="about">
    <div>
      <small>HistogramPage</small>
      <Histogram />
    </div>
  </div>
</template>
<script>
import Histogram from "@/components/Histogram.vue";
export default {
  name: "HistogramPage",
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
  },
  components: {
    Histogram
  }
};
</script>

<style lang="scss" scoped>
</style>

