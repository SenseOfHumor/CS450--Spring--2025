import React, { Component } from "react";
import * as d3 from "d3";

class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.mapContainer = React.createRef(); // <-- proper way
  }

  componentDidMount() {
    this.drawMap();
  }

componentDidUpdate(prevProps) {
  if (
    prevProps.data !== this.props.data ||
    prevProps.selectedIndustry !== this.props.selectedIndustry
  ) {
    this.drawMap();
  }
}


drawMap() {
  const width = 800;
  const height = 550;

  d3.select(this.mapContainer.current).selectAll("*").remove();

  const svg = d3.select(this.mapContainer.current)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const projection = d3.geoNaturalEarth1()
    .scale(150)
    .translate([width / 2, height / 2]);

  const path = d3.geoPath().projection(projection);

const adoptionSums = {};
const adoptionCounts = {};

this.props.data.forEach(d => {
  if (d.Industry !== this.props.selectedIndustry) return; // 🚨 Only the selected industry

  const country = d.Country;
  const rate = +d["AI Adoption Rate (%)"];
  if (!isNaN(rate)) {
    if (!adoptionSums[country]) {
      adoptionSums[country] = 0;
      adoptionCounts[country] = 0;
    }
    adoptionSums[country] += rate;
    adoptionCounts[country] += 1;
  }
});

// ✅ Now calculate average
const adoptionRateByCountry = {};
Object.keys(adoptionSums).forEach(country => {
  adoptionRateByCountry[country] = adoptionSums[country] / adoptionCounts[country];
});


const colorScale = d3.scaleSequential()
  .domain([0, 100]) // 0% to 100%
  .interpolator(d3.interpolateYlOrRd); // colorful gradient


  d3.json("/world.geojson").then(worldData => {
    svg.selectAll("path")
      .data(worldData.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", d => {
        const countryName = d.properties.name;
        const rate = adoptionRateByCountry[countryName];
        return rate !== undefined ? colorScale(rate) : "#eee"; // gray if no data
      })
      .attr("stroke", "#333")
      .on("mouseover", function (event, d) {
        d3.select(this).attr("stroke", "black").attr("stroke-width", 2);
      })
      .on("mouseout", function (event, d) {
        d3.select(this).attr("stroke", "#333").attr("stroke-width", 1);
      });

      const tooltip = d3.select(this.mapContainer.current)
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
  .on("mouseover", function (event, d) {
    d3.select(this).attr("stroke", "black").attr("stroke-width", 2);

    const countryName = d.properties.name;
    const rate = adoptionRateByCountry[countryName];

    tooltip.transition().duration(200).style("opacity", 0.9);
    tooltip.html(`
      <strong>${countryName}</strong><br/>
      AI Adoption: ${rate !== undefined ? rate.toFixed(1) + "%" : "No data"}
    `)
    .style("left", (event.pageX + 10) + "px")
    .style("top", (event.pageY - 28) + "px");
  })
  .on("mouseout", function (event, d) {
    d3.select(this).attr("stroke", "#333").attr("stroke-width", 1);
    tooltip.transition().duration(500).style("opacity", 0);
  });

  });

  // 3️⃣ Add Color Legend
const legendWidth = 300;
const legendHeight = 10;

const legendSvg = svg.append("g")
  .attr("transform", `translate(${width - legendWidth - 0},${height - 10})`);

const defs = svg.append("defs");

const linearGradient = defs.append("linearGradient")
  .attr("id", "linear-gradient");

linearGradient
  .attr("x1", "0%")
  .attr("y1", "0%")
  .attr("x2", "100%")
  .attr("y2", "0%");

linearGradient.selectAll("stop")
  .data([
    { offset: "0%", color: colorScale(0) },
    { offset: "100%", color: colorScale(100) }
  ])
  .enter()
  .append("stop")
  .attr("offset", d => d.offset)
  .attr("stop-color", d => d.color);

legendSvg.append("rect")
  .attr("width", legendWidth)
  .attr("height", legendHeight)
  .style("fill", "url(#linear-gradient)");

// Add labels
legendSvg.append("text")
  .attr("x", 0)
  .attr("y", -5)
  .text("Low Adoption");

legendSvg.append("text")
  .attr("x", legendWidth)
  .attr("y", -5)
  .attr("text-anchor", "end")
  .text("High Adoption");

}


  render() {
    return <div ref={this.mapContainer}></div>; // <-- updated
  }
}

export default WorldMap;
