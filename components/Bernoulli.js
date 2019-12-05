const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');


class Bernoulli extends D3Component {
  initialize(node, props) {
    const svg = (this.svg = d3.select(node).append('svg'));

    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    svg.attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    svg
      .append('circle')
      .attr('r', 20)
      .attr('cx', Math.random() * 400)
      .attr('cy', Math.random() * 400);
  }

  update(props, oldProps) {

  }
}

module.exports = Bernoulli;
