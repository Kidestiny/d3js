
let arr = [3203, "Central US"]

let strHtml = arr.reduce((res, val) => 
    res + '<div class="tip-line">' + val + '</div>'
, '')

console.log(strHtml)