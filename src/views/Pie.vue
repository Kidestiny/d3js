<template>
  <div class="home">
    <div class="chart-title">饼图1</div>
    <div class="chart-item">
      <PieChart chartId="chart1" :measure="measure" dimension1="Region" dimension2="State" dimension3="City"/>
      <md-card>
        <md-card-header>
          <div class="md-title">在这里改变左侧饼图的量度</div>
        </md-card-header>

        <md-card-content>
          <div class="line">
            <span class="tip">利润(Profit)</span>
            <md-switch v-model="measure" value="Profit" />
          </div>
          <div class="line">
            <span class="tip">数量(Quantity)</span>
            <md-switch v-model="measure" value="Quantity" />
          </div>
          <div class="line">
            <span class="tip">销量(Sales)</span>
            <md-switch v-model="measure" value="Sales" />
          </div>
          <div class="line">
            <span class="tip">运费(Shipping Cost)</span>
            <md-switch v-model="measure3" value="Shipping Cost" />
          </div>
          <p class="indent">
            该图的第一维度是Region,第二维度是State，第三维度是City。
          </p>
          <p class="indent">
            其中当上一维度选定时，下一维度的数据源就会进行过滤，只留下符合该条件的数据源进行可视化展示。如该图中选定Central US的时候，中间的圈就只会对中美地方的洲(state)的数据进行展示，当点击中间圈的某一个洲时，最外面一圈的城市位置就都是符合中间圈选定的那个洲
          </p>
          <p class="indent">
            还有一点的是，显示的数据是对量度进行累加操作的。
          </p>
        </md-card-content>
      </md-card>
    </div>

    <div class="chart-title">饼图2</div>
    <div class="chart-item">
      <PieChart chartId="chart2" :measure="measure2" dimension1="Category" dimension2="Sub-Category" dimension3=""/>
      <md-card>
        <md-card-header>
          <div class="md-title">在这里改变左侧饼图的量度</div>
        </md-card-header>

        <md-card-content>
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
            <md-switch v-model="measure3" value="Shipping Cost" />
          </div>
        </md-card-content>
      </md-card>
    </div>

    <div class="chart-title">饼图3</div>
    <div class="chart-item">
      <PieChart chartId="chart3" :measure="measure3" :dimension1="dimension1"/>
      <md-card>
        <md-card-header>
          <div class="md-title">在这里改变左侧饼图的量度、维度</div>
        </md-card-header>

        <md-card-content>
          <p>
            维度
          </p>
          <div class="line">
            <span class="tip">Order Priority</span>
            <md-switch v-model="dimension1" value="Order Priority" />
          </div>
          <div class="line">
            <span class="tip">Segment</span>
            <md-switch v-model="dimension1" value="Segment" />
          </div>
          <div class="line">
            <span class="tip">Ship Mode</span>
            <md-switch v-model="dimension1" value="Ship Mode" />
          </div>
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
import HelloWorld from "@/components/HelloWorld.vue";
import PieChart from "@/components/PieChart.vue";

export default {
  name: "PieChart",
  data: () => ({
    measure: "Quantity",
    measure2: "Quantity",
    measure3: "Quantity",
    dimension1: "Order Priority"
  }),
  components: {
    HelloWorld,
    PieChart
  }
};
</script>

<style lang="scss" scoped>
.chart-item {
  display: flex;
  justify-content: space-around;
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

