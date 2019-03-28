<template>
  <div class="histogram">
    <div :id="chartId" :style="{width:1200+'px',height:height+'px'}" />
  </div>
</template>

<script>
import utils from "../utils";
const d3 = window.d3;
export default {
  name: "Histogram",
  props: {
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 600
    },
    chartId: {
      type: String,
      default: "Histogram"
    },
    dimension: {
      type: String,
      default: "Region"
    },
    measure: {
      type: String,
      default: "Sales"
    },
    filters: {
      type: Array,
      default: []
    }
  },
  computed: {
    dataSourse() {
      console.log(this.filters);
      if (this.$root.$data.superstore.length == 0) return [];
      let res = this.$root.$data.superstore.filter(
        val =>
          // 此处的意思为过滤数组中存在一条不满足就返回false，只有全部满足才保留
          !this.filters.some(item => val[item.index] != item.value)
      );
      return res;
    },
    histogramdata() {
      let chartData = this.dataSourse.map(val => val[this.dimension]);
      let indexSet = [...new Set(chartData)];
      let count = {};
      indexSet.forEach(val => (count[val] = 0));
      this.$root.$data.superstore.forEach(
        val => (count[val[this.dimension]] += parseFloat(val[this.measure]))
      );
      let countArr = indexSet.map(val => count[val]);
      return {
        indexSet,
        countArr
      };
    }
  },
  model: {
    prop: "model",
    event: "change"
  },
  mounted() {
    this.histogramSvg = d3.select("#" + this.chartId).append("svg");
    utils.absoluteCenter(this.histogramSvg);
    this.mountHistogram(this.histogramdata, this.histogramSvg);
  },
  watch: {
    histogramdata(val) {
      if (this.histogramSvg) {
        this.mountHistogram(val, this.histogramSvg);
      }
    }
  },
  methods: {
    mountHistogram(chart, svg) {
      let vueDom = this;
      let width = chart.countArr.length * 100;
      width = width < this.width ? this.width : width;
      width = width > 1200 ? 1200 : this.width;

      let height = this.height || 400;
      let dataset = chart.countArr || [];
      let indexSet = chart.indexSet || [];

      let padding = { left: 100, right: 100, top: 20, bottom: 20 };
      svg.attr("height", height).attr("width", width);

      svg.html("");

      //x轴的比例尺
      let xScale = d3.scale
        .ordinal()
        .domain(indexSet)
        .rangeRoundBands([0, width - padding.left - padding.right]);

      //y轴的比例尺
      let yScale = d3.scale
        .linear()
        .domain([0, d3.max(dataset.map(val => Math.abs(val)))])
        .range([height - padding.top - padding.bottom, 0]);

      //定义x轴
      let xAxis = d3.svg
        .axis()
        .scale(xScale)
        .orient("bottom");

      //定义y轴
      let yAxis = d3.svg
        .axis()
        .scale(yScale)
        .orient("left");

      //矩形之间的空白
      let rectPadding = 8;
      // 颜色比例尺
      const colorScale = d3.scale
        .linear()
        .domain([
          parseInt(d3.min(dataset)),
          -0.1,
          0,
          parseInt(d3.max(dataset)) + 1
        ])
        .range(["#ffc107", "#ffe082", "#afbfff", "#455ede"]);

      //添加矩形元素
      let rects = svg
        .selectAll(".MyRect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "MyRect");
      rects
        .attr(
          "transform",
          "translate(" + padding.left + "," + padding.top + ")"
        )
        .attr("fill", function(d) {
          if (d > 0) return colorScale(d);
          else {
            console.log(d);
            console.log(colorScale(d));
            return "#b30000";
          }
        })
        .attr("x", function(d, i) {
          return xScale(indexSet[i]) + rectPadding / 2;
        })
        .attr("width", xScale.rangeBand() - rectPadding)
        .attr("y", function(d) {
          let min = yScale.domain()[0];
          return yScale(min);
        })
        .attr("height", function(d) {
          return 0;
        })
        .transition()
        .delay(function(d, i) {
          return i * 200;
        })
        .duration(2000)
        .ease("bounce")
        .attr("y", function(d) {
          if (d > 0) return yScale(d);
          else return yScale(-d);
        })
        .attr("height", function(d) {
          if (height - padding.top - padding.bottom - yScale(d) > 0)
            return height - padding.top - padding.bottom - yScale(d);
          else return -(height - padding.top - padding.bottom - yScale(d));
        });
      //添加事件监听
      rects
        .on("mouseover", function(d, i) {
          d3.select(this).style("opacity", 0.7);
          let div = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
          div
            .transition()
            .duration(3000)
            .style("opacity", 0);
          div
            .transition()
            .duration(1000)
            .style("opacity", 0.9);
          div
            .html(utils.tipLinesHtml(indexSet[i], d.toFixed(2)))
            .style("left", d3.event.pageX + 28 + "px")
            .style("top", d3.event.pageY - 28 + "px");
        })
        .on("mouseout", function() {
          d3.select(this).style("opacity", 1);
          d3.selectAll(".tooltip").remove();
        })
        .on("click", function(d, i) {
          console.log(d, i, indexSet[i]);
          vueDom.$emit("change", indexSet[i]);
        });

      //添加x轴
      svg
        .append("g")
        .attr("class", "axis")
        .attr(
          "transform",
          "translate(" + padding.left + "," + (height - padding.bottom) + ")"
        )
        .call(xAxis)
        .append("text")
        .text(this.dimension)
        .attr(
          "transform",
          "translate(" + (width - padding.left - padding.right + 5) + ", 5)"
        );

      //添加y轴
      svg
        .append("g")
        .attr("class", "axis")
        .attr(
          "transform",
          "translate(" + padding.left + "," + padding.top + ")"
        )
        .call(yAxis)
        .append("text")
        .text(this.measure)
        .attr("transform", "translate(-34, -10)");
    }
  }
};
</script>

<style lang="scss">
.axis path,
.axis line {
  fill: none;
  stroke: black;
  shape-rendering: crispEdges;
}

.axis text {
  font-family: sans-serif;
  font-size: 11px;
}

.histogram {
  > div {
    position: relative;
  }
}
</style>

