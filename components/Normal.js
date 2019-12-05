const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

class Normal extends D3Component {
  initialize(node, props) {
    const svg = (this.svg = d3.select(node).append('svg'));

    var data = [];

    getData(data); // populate data


    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 700 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    var x = d3.scaleLinear()
        .range([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);


    var line = d3.line()
        .x(function(d) {
            return x(d.q);
        })
        .y(function(d) {
            return y(d.p);
        });

    svg.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function(d) {
        return d.q;
    }));
    y.domain(d3.extent(data, function(d) {
        return d.p;
    }));

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);
  }

}

function getData(data) {

// loop to populate data array with
// probabily - quantile pairs
for (var i = 0; i < 100000; i++) {
    var q = normal() // calc random draw from normal dist
    var p = gaussian(q) // calc prob of rand draw
    var el = {
        "q": q,
        "p": p
    }
    data.push(el)
};

// need to sort for plotting
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
data.sort(function(x, y) {
    return x.q - y.q;
});
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

//taken from Jason Davies science library
// https://github.com/jasondavies/science.js/
function gaussian(x) {
  var gaussianConstant = 1 / Math.sqrt(2 * Math.PI),
    mean = 0,
      sigma = 1;

    x = (x - mean) / sigma;
    return gaussianConstant * Math.exp(-.5 * x * x) / sigma;
};

module.exports = Normal;
