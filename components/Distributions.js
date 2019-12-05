const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

var margin = {top: 10, right: 30, bottom: 30, left: 40},
width = 600 - margin.left - margin.right,
height = 300 - margin.top - margin.bottom;

var data = [];

var sqrt = Math.sqrt, pow = Math.pow, e = Math.E, pi = Math.PI;


var x = d3.scaleLinear()
  .domain([-4,4])
    .range([0, width]);

var histogram = d3.histogram()
  .value(function(d) { return d.q; })   // I need to give the vector of value
  .domain(x.domain())  // then the domain of the graphic
  .thresholds(x.ticks(50));

class Distributions extends D3Component {
  initialize(node, props) {

    getData(data, props.samplesize); // populate data

    const svg = (this.svg = d3.select(node).append('svg'))
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    var bins = histogram(data);

    var y = d3.scaleLinear()
        .domain([0, d3.max(bins, function(d) { return d.length; })])
        .range([height, 0]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    this.yAxis = svg.append("g")
      .call(d3.axisLeft(y));

    this.bars = svg.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#69b3a2")

        var y2 = d3.scaleLinear()
            .domain([0,1 / (sqrt(2 * pi))])
            .range([height, 0]);

        var g = svg.append("svg:g")
          .classed("series", true)

        g.append("path")
            .attr("fill", "none")
            .attr("stroke-width", 3)
            .attr("stroke", "navy")
            .attr("d", function(d) { return d3.line()(
              x.ticks(100).map(function(xi) {
                return [ x(xi), y2(pdf(xi)) ]
              })
             )})
  }

  update(props, oldProps) {
    data = []
    getData(data, props.samplesize)
    var bins = histogram(data);

    var y = d3.scaleLinear()
        .domain([0, d3.max(bins, function(d) { return d.length; })])
        .range([height, 0]);

    this.yAxis
        .transition()
        .duration(1000)
        .call(d3.axisLeft(y));



    this.bars.data(bins).enter()
        .append("rect") // Add a new rect for each new elements
        .merge(this.bars) // get the already existing elements as well
        .transition() // and apply changes to all of them
        .duration(1000)
          .attr("x", 1)
          .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
          .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
          .attr("height", function(d) { return height - y(d.length); })
          .style("fill", "#69b3a2")

          this.bars
              .exit()
              .remove()
  }
}

function getData(data, size) {

  // loop to populate data array with
  // probabily - quantile pairs
  for (var i = 0; i < size; i++) {
      var q = normal() // calc random draw from normal dist
      var el = {
          "q": q
      }
      data.push(el)
};

}

// from http://bl.ocks.org/mbostock/4349187
// Sample from a normal distribution with mean 0, stddev 1.
function normal() {
    var x = 0,
        y = 0,
        rds, c;
    do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        rds = x * x + y * y;
    } while (rds == 0 || rds > 1);
    c = Math.sqrt(-2 * Math.log(rds) / rds); // Box-Muller transform
    return x * c; // throw away extra sample y * c
}

function pdf(x) {
  // per: http://en.wikipedia.org/wiki/Gaussian_function
  // and: http://mathworld.wolfram.com/GaussianFunction.html
  var a = 1 / (sqrt(2 * pi));
  return a * pow(e, -(x*x)/2);
}

module.exports = Distributions;
