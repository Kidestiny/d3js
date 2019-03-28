<template>
  <div class="about">
    <h3>
      在各个州的利润
    </h3>
    <tr>
        <td>选项</td>
        <td><input type="radio" name="mapa" class="form-control mapaClick" value="0" checked> profit of all  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><br/>
        <td><input type="radio" name="mapa" class="form-control mapaClick" value="1"> profit of technology  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><br/>
        <td><input type="radio" name="mapa" class="form-control mapaClick" value="2"> profit of office_supplies  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><br/>
        <td><input type="radio" name="mapa" class="form-control mapaClick" value="3"> profit of furniture  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><br/>
    </tr>
    <div id="map">
    </div>
  </div>
</template>
<script>
import utils from "../utils";
const d3 = window.d3v4;
export default {
  data: () => ({}),
  computed: {},
  mounted() {
    function upmapdata(link_source) {
      var w = 1000;
      var h = 600;

      //定义地图的投影
      var projection = d3
        .geoAlbersUsa()
        .translate([w / 2, h / 2])
        .scale([1000]);

      //定义path generator
      var path = d3.geoPath().projection(projection);

      //定义量子比例尺（quantize scale），将数据值归入不同的颜色值
      var color1 = d3
        .scaleQuantize()
        .range([
          // "#f1eef6",
          // "#d0d1e6",
          // "#a6bddb",
          // "#74a9cf",
          // "#2b8cbe",
          // "#045a8d"

          // "#fff7fb",
          // "#ece7f2",
          "#d0d1e6",
          "#a6bddb",
          "#74a9cf",
          "#3690c0",
          "#0570b0",
          "#045a8d",
          "#023858"

        ]);

      //定义量子比例尺（quantize scale），将数据值归入不同的颜色值
      var color2 = d3
        .scaleQuantize() //红色
        .range([
          // "#fef0d9",
          // "#fdd49e",
          // "#fdbb84",
          // "#fc8d59",
          // "#ef6548",
          // "#d7301f",
          // "#990000"

          // "#fff7ec",
          // "#fee8c8",
          // "#fdd49e",
          // "#fdbb84",
          "#fc8d59",
          "#ef6548",
          "#d7301f",
          "#b30000",
          "#7f0000"
        ]);
      document.querySelector("#map").innerHTML = ""

      //创建SVG元素
      var svg = d3
        .select("#map")
        .append("g")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
        

      d3.csv(link_source,
        function(data) {
          console.log(data[0]);
          //设置颜色比例尺的定义域
          //在这里我用了两个比例尺
          color1.domain([
            d3.min(data, function(d) {
              return d.Profit > 0 ? d.Profit : 0;
            }),
            d3.max(data, function(d) {
              return d.Profit;
            })
          ]);
          color2.domain([
            d3.min(data, function(d) {
              return d.Profit < 0 ? -d.Profit : 999999999;
            }),
            d3.max(data, function(d) {
              return d.Profit < 0 ? -d.Profit : 0;
            })
          ]);
          
          d3.json(
            "https://cdn.yice.org.cn/us-states.json",
            function(json) {
              for (var i = 0; i < data.length; ++i) {
                //获取州名
                var dataState = data[i].State;
                //获取该州所对应的数据值，并将字符串类型转换成浮点数类型
                var dataValue = parseFloat(data[i].Profit);
                for (var j = 0; j < json.features.length; ++j) {
                  var jsonState = json.features[j].properties.name;
                  if (dataState == jsonState) {
                    json.features[j].properties.Profit = dataValue;
                    break;
                  }
                }
              }

              
              svg
                .selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("fill", function(d) {
                  var value = d.properties.Profit;

                  if (value > 0) return color1(value);
                  else if (value < 0) {
                    console.log(value);
                    value = 0 - value;
                    return color2(value);
                  } else return "#cccccc";
                })
                .on("mouseover", stateMouseover)
                .on("mouseout", stateMouseout);
            }
          );
        }
      );
      function stateMouseover(d) {
        
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
            .html(utils.tipLinesHtml(d.properties.name + " " + d.properties.Profit))
            .style("left", d3.event.pageX + 28 + "px")
            .style("top", d3.event.pageY - 28 + "px");
      }

      function stateMouseout() {
        d3.selectAll(".tooltip").remove();
      }

      var zoom = d3
        .zoom()
        .scaleExtent([1, 10])
        .on("zoom", zoomed);

      function zoomed() {
        circles_group.attr(
          "transform",
          "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"
        );
      }
    }

    upmapdata("https://cdn.yice.org.cn/zhanan/profit.csv");
    d3.selectAll(".mapaClick").on("click", mapChange);
    function mapChange() {
      console.log(this.value);
      if(this.value==0)
        upmapdata("https://cdn.yice.org.cn/zhanan/profit.csv");
      else if(this.value==1)
        upmapdata("https://cdn.yice.org.cn/zhanan/technology.csv");
      else if(this.value==2)
        upmapdata("https://cdn.yice.org.cn/zhanan/office_supplies.csv");
      else if(this.value==3)
        upmapdata("https://cdn.yice.org.cn/zhanan/furniture.csv");
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

