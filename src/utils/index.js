function tipLinesHtml() {
    let arr = [...arguments]
    let strHtml = arr.reduce((res, val) => res += '<div class="tip-line">' + val + '</div>', '')
    return strHtml;
}


function absoluteCenter(svg, zIndex) {
    svg
      .style("position", "absolute")
      .style("top", "50%")
      .style("left", "50%")
      .style("transform", "translate(-50%, -50%)");
    if (zIndex) {
      svg.style("z-index", zIndex);
    }
  }

export default {
    tipLinesHtml,
    absoluteCenter
}