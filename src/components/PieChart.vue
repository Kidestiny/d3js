<template>
  <div class="pie-chart">
    <div :id="chartId" :style="{width:width+'px',height:height+'px'}"></div>
  </div>
</template>

<script>
import utils from "../utils";
const d3 = window.d3;
export default {
  name: "Pie",
  data: () => ({
    dimension1_focus: "",
    dimension2_focus: ""
  }),
  props: {
    width: {
      type: Number,
      default: 700
    },
    height: {
      type: Number,
      default: 700
    },
    chartId: {
      type: String,
      default: "pie-chart"
    },
    dimension1: {
      type: String,
      default: "Region"
    },
    dimension2: {
      type: String,
      default: ""
    },
    dimension3: {
      type: String,
      default: ""
    },
    measure: {
      type: String,
      default: "Sales"
    }
  },
  computed: {
    piedata1() {
      let chartData = this.$root.$data.superstore.map(
        val => val[this.dimension1]
      );
      let indexSet = [...new Set(chartData)];
      let count = {};
      indexSet.forEach(val => (count[val] = 0));
      this.$root.$data.superstore.forEach(
        val => (count[val[this.dimension1]] += parseFloat(val[this.measure]))
      );
      let countArr = indexSet.map(val => count[val]);
      return {
        indexSet,
        countArr,
        outerRadius: 150,
        innerRadius: 0,
        width: 300,
        height: 300,
        dimension: 1
      };
    },
    piedata2Sourse() {
      return this.$root.$data.superstore.filter(
        val => val[this.dimension1] == this.dimension1_focus
      );
    },
    piedata2() {
      let indexSet, countArr;
      if (this.dimension2 != "") {
        let chartData = this.piedata2Sourse.map(val => val[this.dimension2]);
        indexSet = [...new Set(chartData)];
        let count = {};
        indexSet.forEach(val => (count[val] = 0));
        this.piedata2Sourse.forEach(
          val => (count[val[this.dimension2]] += parseFloat(val[this.measure]))
        );
        countArr = indexSet.map(val => count[val]);
      } else {
        indexSet = [];
        countArr = [];
      }
      return {
        indexSet,
        countArr,
        outerRadius: 250,
        innerRadius: 160,
        width: 500,
        height: 500,
        dimension: 2
      };
    },
    piedata3Sourse() {
      return this.$root.$data.superstore.filter(
        val => val[this.dimension2] == this.dimension2_focus
      );
    },
    piedata3() {
      let indexSet, countArr;
      if (this.dimension3 != "") {
        let chartData = this.piedata3Sourse.map(val => val[this.dimension3]);
        indexSet = [...new Set(chartData)];
        let count = {};
        indexSet.forEach(val => (count[val] = 0));
        this.piedata2Sourse.forEach(
          val => (count[val[this.dimension3]] += parseFloat(val[this.measure]))
        );
        countArr = indexSet.map(val => count[val]);
      } else {
        indexSet = [];
        countArr = [];
      }
      return {
        indexSet,
        countArr,
        outerRadius: 350,
        innerRadius: 260,
        width: 700,
        height: 700,
        dimension: 3
      };
    }
  },
  mounted() {
    window.piecharDom = this;
    this.pieChartSvg1 = d3.select("#" + this.chartId).append("svg");
    utils.absoluteCenter(this.pieChartSvg1, 3);
    this.mountPieChart(this.piedata1, this.pieChartSvg1);
    this.pieChartSvg2 = d3.select("#" + this.chartId).append("svg");
    utils.absoluteCenter(this.pieChartSvg2, 2);
    this.mountPieChart(this.piedata2, this.pieChartSvg2);
    this.pieChartSvg3 = d3.select("#" + this.chartId).append("svg");
    utils.absoluteCenter(this.pieChartSvg3, 1);
    this.mountPieChart(this.piedata3, this.pieChartSvg3);
  },
  watch: {
    piedata1(val) {
      if (this.pieChartSvg1) {
        this.mountPieChart(val, this.pieChartSvg1);
      }
    },
    piedata2(val) {
      if (this.pieChartSvg2) {
        this.mountPieChart(val, this.pieChartSvg2);
      }
    },
    piedata3(val) {
      if (this.pieChartSvg3) {
        this.mountPieChart(val, this.pieChartSvg3);
      }
    }
  },
  methods: {
    mountPieChart(chart, svg) {
      let vueDom = this;
      let width = chart.width || this.width || 400;
      let height = chart.height || this.height || 400;
      let dataset = chart.countArr || [];
      let indexSet = chart.indexSet || [];
      let outerRadius = chart.outerRadius || 150; //外半径
      let innerRadius = chart.innerRadius || 0; //内半径，为0则中间没有空白

      // 初始化，清空内容
      svg.attr("width", width).attr("height", height);
      svg.html("");

      let pie = d3.layout.pie();
      let piedata = pie(dataset);
      let arc = d3.svg
        .arc() //弧生成器
        .innerRadius(innerRadius) //设置内半径
        .outerRadius(outerRadius); //设置外半径

      let arcs = svg
        .selectAll("g")
        .data(piedata)
        .enter()
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + width / 2 + ")");

      let color =  d3.scale.category10();  //有十种颜色的颜色比例尺

      arcs
        .append("path")
        .attr("fill", function(d, i) {
          return color(i);
        })
        .attr("d", function(d) {
          return arc(d);
        });

      arcs
        .append("text")
        .attr("transform", function(d) {
          return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text( (d, i) => (d.endAngle - d.startAngle > 0.25 ? indexSet[i] : ""));

      arcs
        .on("mouseover", function(d, i) {
          d3.select(this).style("opacity", 0.7);
          let div = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

          div
            .transition()
            .duration(300)
            .style("opacity", 0);
          div
            .transition()
            .duration(100)
            .style("opacity", 0.9);
          div
            .html(utils.tipLinesHtml(indexSet[i], d.data.toFixed(2)))
            .style("left", d3.event.pageX + 28 + "px")
            .style("top", d3.event.pageY - 28 + "px");
        })
        .on("mouseout", function() {
          d3.select(this).style("opacity", 1);
          d3.select(".tooltip").remove();
        });

      if ([1, 2].indexOf(chart.dimension) != -1) {
        arcs.on("click", function(d, i) {
          if (chart.dimension == 1) {
            vueDom.dimension1_focus =
              vueDom.dimension1_focus == indexSet[i]
                ? ""
                : indexSet[i];
          } else if (chart.dimension == 2) {
            vueDom.dimension2_focus =
              vueDom.dimension2_focus == indexSet[i]
                ? ""
                : indexSet[i];
          }
        });
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.pie-chart {
  position: relative;
  > div {
    position: relative;
    svg {
      position: absolute;
    }
  }
}
</style>


