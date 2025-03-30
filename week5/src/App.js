import React, { Component } from "react";
import * as d3 from "d3";

class HeatMap extends Component {
  componentDidMount() {
    const tooltip = d3.select("body").selectAll(".tooltip").data([0]).join("div").attr("class", "tooltip")
    .style("opacity", 0).style("background-color", "white").style("position", "absolute")
    .style("border", "1px solid gray").style("border-radius", "5px").style("padding", "5px")

    const width=200,height=200, margin = { top: 30, right: 30, bottom: 30, left: 30 },
      inner_width = width - margin.left - margin.right,
      inner_height = height - margin.top - margin.bottom;

    const chart_container = d3.select("svg").attr("width", width).attr("height", height)
      .selectAll("g").data([0]).join("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const data = [
      { variable1: "A", variable2: "A", correlation: 1 }, { variable1: "A", variable2: "B", correlation: 0.5 },
      { variable1: "A", variable2: "C", correlation: -0.2 }, { variable1: "B", variable2: "A", correlation: 0.5 },
      { variable1: "B", variable2: "B", correlation: 1 }, { variable1: "B", variable2: "C", correlation: 0.8 },
      { variable1: "C", variable2: "A", correlation: -0.2 }, { variable1: "C", variable2: "B", correlation: 0.8 },
      { variable1: "C", variable2: "C", correlation: 1 }
    ];

    const variable1_values = [...new Set(data.map(d => d.variable1))];
    const variable2_values = [...new Set(data.map(d => d.variable2))];

    const x_axis_scale = d3.scaleBand().range([0, inner_width]).domain(variable1_values).padding(0.01);
    chart_container.selectAll(".x-axis").data([0]).join("g").attr("class", "x-axis").attr("transform", `translate(0, ${inner_height})`).call(d3.axisBottom(x_axis_scale));

    const y_axis_scale = d3.scaleBand().range([inner_height,0]).domain(variable2_values).padding(0.01);
    chart_container.selectAll(".y-axis").data([0]).join("g").attr("class", "y-axis").call(d3.axisLeft(y_axis_scale));

    const ColorScale = d3.scaleLinear().range(["red", "white", "green"]).domain([-1, 0, 1]);

    chart_container.selectAll("rect").data(data).join("rect")
      .attr("x", (d) => x_axis_scale(d.variable1)).attr("y", (d) => y_axis_scale(d.variable2))
      .attr("width", x_axis_scale.bandwidth()).attr("height", y_axis_scale.bandwidth())
      .attr("fill", (d) => ColorScale(d.correlation))
      .on("mouseover", () => tooltip.style("opacity", 1))
      .on("mousemove", (event, d) => tooltip.style("left", `${event.pageX}px`).style("top", `${event.pageY-35}px`).html(`Correlation of ${d.variable1} and ${d.variable2}: ${d.correlation}`))
      .on("mouseleave", () => tooltip.style("opacity", 0));
  }

  render() {
    return <svg></svg>
  }
}

export default HeatMap;