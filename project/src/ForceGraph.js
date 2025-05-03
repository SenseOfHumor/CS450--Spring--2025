import React, { Component } from "react";
import * as d3 from "d3";

class ForceGraph extends Component {
  constructor(props) {
    super(props);
    this.graphRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.data.length > 0) {
      this.drawGraph();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.drawGraph();
    }
  }

  drawGraph() {
    const width = 1000;
    const height = 1200;

    d3.select(this.graphRef.current).selectAll("*").remove(); // Clear old

    const svg = d3.select(this.graphRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // 🛠️ Build nodes and links
    const industrySet = new Set();
    const countrySet = new Set();

    this.props.data.forEach(d => {
      industrySet.add(d.Industry);
      countrySet.add(d.Country);
    });

    const industries = Array.from(industrySet);
    const countries = Array.from(countrySet);

    const nodes = [];
    const nodeMap = {};

    industries.forEach(ind => {
      const node = { id: ind, type: "industry" };
      nodes.push(node);
      nodeMap[ind] = node;
    });

    countries.forEach(cntry => {
      const node = { id: cntry, type: "country" };
      nodes.push(node);
      nodeMap[cntry] = node;
    });

    const links = this.props.data.map(d => ({
      source: d.Industry,
      target: d.Country,
      adoption: +d["AI Adoption Rate (%)"],
      regulation: d["Regulation Status"]
    }));

    // 🛠️ Scales
    const sizeScale = d3.scaleLinear()
      .domain([0, 100])
      .range([5, 20]);

    const colorScale = d3.scaleOrdinal()
      .domain(["Strict", "Moderate", "Lenient"])
      .range(["#e63946", "#f1fa8c", "#2a9d8f"]);

    // 🛠️ D3 Force Layout
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // 🛠️ Draw links
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 1.5);

    // 🛠️ Draw nodes
    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", d => d.type === "industry" ? 10 : 6)
      .attr("fill", d => d.type === "industry" ? "#1d3557" : "#a8dadc")
      .call(d3.drag()
        .on("start", dragStart)
        .on("drag", dragged)
        .on("end", dragEnd)
      );

    // 🛠️ Add tooltips
    const tooltip = d3.select(this.graphRef.current)
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "white")
      .style("padding", "5px")
      .style("border", "1px solid black")
      .style("border-radius", "5px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    node.on("mouseover", (event, d) => {
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip.html(`<strong>${d.id}</strong> (${d.type})`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", () => {
      tooltip.transition().duration(500).style("opacity", 0);
    });

    // 🛠️ Update positions
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    });

    // 🛠️ Dragging functions
    function dragStart(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnd(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }

  render() {
    return <div ref={this.graphRef}></div>;
  }
}

export default ForceGraph;
