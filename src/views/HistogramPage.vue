<template>
  <div class="about">
      <div class="chart-item">
        <Histogram v-model="choosen1" chartId="histogram1" :dimension="dimension1" :measure="measure1" :filters="[]"/>
        <md-card>
          <md-card-header>
            <div class="md-title">在这里改变左侧直方图的量度</div>
          </md-card-header>

          <md-card-content>
            <p>
              量度
            </p>
            <div class="line">
              <span class="tip">利润(Profit)</span>
              <md-switch v-model="measure1" value="Profit" />
            </div>
            <div class="line">
              <span class="tip">数量(Quantity)</span>
              <md-switch v-model="measure1" value="Quantity" />
            </div>
            <div class="line">
              <span class="tip">销量(Sales)</span>
              <md-switch v-model="measure1" value="Sales" />
            </div>
            <div class="line">
              <span class="tip">运费(Shipping Cost)</span>
              <md-switch v-model="measure1" value="Shipping Cost" />
            </div>
          </md-card-content>
        </md-card>
      </div>
      <div class="chart-item">
        <Histogram v-model="choosen2" chartId="histogram2" :dimension="dimension2" :measure="measure2" :filters="filter2"/>
        <md-card>
          <md-card-header>
            <div class="md-title">在这里改变左侧直方图的量度</div>
          </md-card-header>

          <md-card-content>
            <p>
              量度
            </p>
            <div class="line">
              <span class="tip">利润(Profit)</span>
              <md-switch v-model="measure2" value="Profit" />
            </div>
            <div class="line">
              <span class="tip">数量(Quantity)</span>
              <md-switch v-model="measure2" value="Quantity" />
            </div>
            <div class="line">
              <span class="tip">销量(Sales)</span>
              <md-switch v-model="measure2" value="Sales" />
            </div>
            <div class="line">
              <span class="tip">运费(Shipping Cost)</span>
              <md-switch v-model="measure2" value="Shipping Cost" />
            </div>
          </md-card-content>
        </md-card>
      </div>
      <div class="chart-item">
        <Histogram chartId="histogram3" :dimension="dimension3" :measure="measure3" :filters="filter3"/>
        <md-card>
          <md-card-header>
            <div class="md-title">在这里改变左侧直方图的量度</div>
          </md-card-header>

          <md-card-content>
            <p>
              量度
            </p>
            <div class="line">
              <span class="tip">利润(Profit)</span>
              <md-switch v-model="measure3" value="Profit" />
            </div>
            <div class="line">
              <span class="tip">数量(Quantity)</span>
              <md-switch v-model="measure3" value="Quantity" />
            </div>
            <div class="line">
              <span class="tip">销量(Sales)</span>
              <md-switch v-model="measure3" value="Sales" />
            </div>
            <div class="line">
              <span class="tip">运费(Shipping Cost)</span>
              <md-switch v-model="measure3" value="Shipping Cost" />
            </div>
          </md-card-content>
        </md-card>
      </div>
  </div>
</template>
<script>
import Histogram from "@/components/Histogram.vue";
export default {
  name: "HistogramPage",
  data: () => ({
    dimension1: "Region",
    measure1: "Profit",
    choosen1: "",
    dimension2: "State",
    measure2: "Profit",
    choosen2: "",
    dimension3: "City",
    measure3: "Profit",
  }),
  computed: {
    filter2() {
      console.log([
        { index: this.dimension1, value: this.choosen1 || "" }
      ])
      return [
        { index: this.dimension1, value: this.choosen1 || "" }
      ];
    },
    filter3() {
      return [
        { index: this.dimension1, value: this.choosen1 || "" },
        { index: this.dimension2, value: this.choosen2 || "" }
      ];
    }
  },
  components: {
    Histogram
  }
};
</script>

<style lang="scss" scoped>
.chart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .line {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .indent {
    text-indent: 28px;
  }
  .md-card {
    width: 400px;
  }
}
.chart-title {
  font-size: 30px;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #ddd;
  margin: 0px 10px 20px 10px;
}
</style>

