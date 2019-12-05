const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

var margin = {top: 10, right: 30, bottom: 60, left: 40},
width = 600 - margin.left - margin.right,
height = 330 - margin.top - margin.bottom;

var sqrt = Math.sqrt, pow = Math.pow, e = Math.E, pi = Math.PI;

class HypTest extends D3Component {
  initialize(node, props) {
    var std = props.sigma/sqrt(props.nsamples)

    this.svg = (this.svg = d3.select(node).append('svg'))
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var minX = Number(props.mean) - 4 * Number(std);
        var maxX = Number(props.mean) + 4 * Number(std);

        console.log(minX);
        console.log(maxX);

        var x = d3.scaleLinear()
            .domain([d3.min([minX, props.xbar]),d3.max([maxX, props.xbar])])
            .range([0, width]);

        var y = d3.scaleLinear()
            .domain([0, 1 / (sqrt(2 * pi) * std)])
            .range([height, 0]);

        var line =
          x.ticks(100).map(function(xi) {
            return [ x(xi), y(pdf(xi, props)) ]
          })

        var area =


        this.svg.selectAll("g").remove()

        this.xax = this.svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        this.yax = this.svg.append("g")
          .call(d3.axisLeft(y));

        var g = this.svg.append("svg:g")
          .classed("series", true)

        this.curve = g.append("path")
            .attr("fill", "none")
            .attr("stroke-width", 3)
            .attr("stroke", "navy")
            .attr("d", d3.line()(line))

        this.xbarline = g.append("line")
         .attr("x1", x(props.xbar))  //<<== change your code here
         .attr("y1", 0)
         .attr("x2", x(props.xbar))  //<<== and here
         .attr("y2", height)
         .style("stroke-width", 2)
         .style("stroke", "red")
         .style("fill", "none");

         this.result = this.svg.append("text")
            .attr("x", -20)
            .attr("y", 305)
            .text("Test")

  }

  update(props, oldProps) {
    this.draw(props);
  }

  draw(props) {
    var std = props.sigma/sqrt(props.nsamples)

    var minX = Number(props.mean) - 4 * Number(std);
    var maxX = Number(props.mean) + 4 * Number(std);

    console.log(minX);
    console.log(maxX);

    var x = d3.scaleLinear()
        .domain([d3.min([minX, props.xbar]),d3.max([maxX, props.xbar])])
        .range([0, width]);

    var y = d3.scaleLinear()
        .domain([0, 1 / (sqrt(2 * pi) * std)])
        .range([height, 0]);

    var line =
      x.ticks(100).map(function(xi) {
        return [ x(xi), y(pdf(xi, props)) ]
      })


    // this.svg.selectAll("g").remove()

    this.xax
      .transition()
      .duration(1000)
      .call(d3.axisBottom(x));

    this.yax
      .transition()
      .duration(1000)
      .call(d3.axisLeft(y));

    this.curve
      .transition()
      .duration(1000)
      .attr("fill", "none")
      .attr("stroke-width", 3)
      .attr("stroke", "navy")
      .attr("d", d3.line()(line))

    this.xbarline
      .transition()
      .duration(1000)
      .attr("x1", x(props.xbar))  //<<== change your code here
      .attr("y1", 0)
      .attr("x2", x(props.xbar))  //<<== and here
      .attr("y2", height)
      .style("stroke-width", 2)
      .style("stroke", "red")
      .style("fill", "none");

     this.result
      .transition()
      .duration(1000)
      .text("Changed")
  }
}


function pdf(x, props) {
  var std = props.sigma/sqrt(props.nsamples)
  // per: http://en.wikipedia.org/wiki/Gaussian_function
  // and: http://mathworld.wolfram.com/GaussianFunction.html
  var a = 1 / (std * sqrt(2 * pi));
  return a * pow(e, -1 * pow((x - props.mean)/std, 2)/2);
}

module.exports = HypTest;
