import React, { Component } from "react";
import * as d3 from "d3";

class Sunburst extends Component {
  constructor(props) {
    super(props);
    this.sunburstRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.data.length > 0) {
      this.drawSunburst();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.drawSunburst();
    }
  }

  buildHierarchy(data) {
    const root = { name: "AI Impact", children: [] };

    data.forEach(row => {
      const industry = row.Industry;
      const country = row.Country;
      const year = row.Year;

      const adoption = +row["AI Adoption Rate (%)"];
      const trust = +row["Consumer Trust in AI (%)"];
      const revenue = +row["Revenue Increase Due to AI (%)"];

      // Find or create Industry
      let industryNode = root.children.find(d => d.name === industry);
      if (!industryNode) {
        industryNode = { name: industry, children: [] };
        root.children.push(industryNode);
      }

      // Find or create Country inside Industry
      let countryNode = industryNode.children.find(d => d.name === country);
      if (!countryNode) {
        countryNode = { name: country, children: [] };
        industryNode.children.push(countryNode);
      }

      // Add Year node
      countryNode.children.push({
        name: year,
        adoption,
        trust,
        revenue
      });
    });

    return root;
  }

  drawSunburst() {
    const width = 600;
    const radius = width / 2;

    d3.select(this.sunburstRef.current).selectAll("*").remove(); // Clear old chart

    const svg = d3.select(this.sunburstRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", width)
      .append("g")
      .attr("transform", `translate(${width / 2},${width / 2})`);

    const hierarchyData = this.buildHierarchy(this.props.data);

    const root = d3.hierarchy(hierarchyData)
      .sum(d => d.adoption || 1) // use adoption if available, else 1
      .sort((a, b) => b.value - a.value);

    const partition = d3.partition()
      .size([2 * Math.PI, radius]);

    partition(root);

    const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const tooltip = d3.select(this.sunburstRef.current)
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "white")
      .style("padding", "5px")
      .style("border", "1px solid black")
      .style("border-radius", "5px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    svg.selectAll("path")
      .data(root.descendants())
      .enter()
      .append("path")
      .attr("display", d => d.depth ? null : "none")
      .attr("d", arc)
      .style("stroke", "#fff")
      .style("fill", d => color((d.children ? d : d.parent).data.name))
      .on("mouseover", function(event, d) {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip.html(`
          <strong>${d.data.name}</strong><br/>
          ${d.data.adoption ? `Adoption: ${d.data.adoption.toFixed(1)}%<br/>` : ""}
          ${d.data.trust ? `Trust: ${d.data.trust.toFixed(1)}%<br/>` : ""}
          ${d.data.revenue ? `Revenue: ${d.data.revenue.toFixed(1)}%` : ""}
        `)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function(event, d) {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Optional: Add center label
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .text("AI Impact");
  }

  render() {
    return <div ref={this.sunburstRef}></div>;
  }
}

export default Sunburst;
