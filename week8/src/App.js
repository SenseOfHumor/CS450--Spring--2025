
// // // import React, { Component } from "react";
// // // import * as d3 from "d3";

// // // class SimpleLineChart extends Component {
// // //   componentDidMount() {
// // //     // Simple data points without scaling
// // //     const data = [[0, 80],[100, 100],[200, 30],[300, 50],[400, 40],[500, 80]];

// // //     // Create a line generator
// // //     var linearGenerator = d3.line().curve(d3.curveBasis);

// // //     // Generate the path data
// // //     var pathData = linearGenerator(data);
// // //     console.log(pathData);

// // //     // Set the dimensions of the chart
// // //     const width = 500, height = 300;

// // //     // Select the SVG
// // //     const svg = d3.select("#line-chart").attr("width", width).attr("height", height);

// // //     // Use join to handle enter, update, and exit of path
// // //     svg.selectAll("path").data([null]).join("path").attr('d', pathData).attr('fill', "None").attr('stroke', 'green').attr('stroke-width', 5); 
// // //   }

// // //   render() {
// // //     return <svg id="line-chart"></svg>;
// // //   }
// // // }

// // // export default SimpleLineChart;


// // import React, { Component } from "react";
// // import * as d3 from "d3";

// // class SimplePieChart extends Component {
// //   componentDidMount() {
// //     var products = [
// //         {product: 'Laptops', sales: 120},{product: 'Tablets', sales: 60},
// //         {product: 'Phones', sales: 200},{product: 'Accessories', sales: 80},
// //         {product: 'Monitors', sales: 50}
// //       ];
// //       var colors = ['#1b9e77','#d95f02','#7570b3','#e7298a','#66a61e']

// //       var pieGenerator = d3.pie().value(d => d.sales).sort((a, b) => a.sales - b.sales);
// //       var arcData = pieGenerator(products);
// //       var arcGenerator = d3.arc().innerRadius(50).outerRadius(150).padAngle(0.01);

// //       d3.select('g').selectAll('path').data(arcData).join('path').attr('d', d => arcGenerator(d))  // Call arcGenerator to generate the path for each arc segment
// //         .attr('fill', (d,i)=>colors[i]);


// //     d3.select("g").selectAll(".pie-label").data(arcData).join("text").attr("class", "pie-label")
// //       .each(function (d) {
// //         var centroid = arcGenerator.centroid(d);
// //         d3.select(this)
// //           .attr("x", centroid[0])
// //           .attr("y", centroid[1])
// //           .attr('text-anchor', 'middle').style('font-size', 11).attr('fill', 'white')
// //           .text(d.data.product);
// //       });
// //   }

// //   render() {
// //     return (
// //       <svg width="900" height="620"><g transform="translate(300, 210)"></g></svg>
// //     );
// //   }
// // }

// // export default SimplePieChart;

// import React, { Component } from "react";
// import * as d3 from "d3";

// class SimpleAreaChart extends Component {
//   componentDidMount() {
//     var data = [
//       {x: 0, y: 0},
//       {x: 1, y: 3},
//       {x: 2, y: 12},
//       {x: 3, y: 8},
//       {x: 4, y: 17},
//       {x: 5, y: 15},
//       {x: 6, y: 20},
//   ];

//   var xScale = d3.scaleLinear().domain([0, 6]).range([25, 175]);
//   var yScale = d3.scaleLinear().domain([0,20]).range([175, 25]);

//   // create the area chart
//   var areaGenerator = d3.area().y(d=>xScale(d.x)).x0(25).x1(d=>yScale(d.y));
//   var pathData = areaGenerator(data);
//   console.log(pathData);
//   d3.select("svg").selectAll("path").data([null]).join("path").attr("d", pathData).attr("fill", "red");

//   }

//   render() {
//     return (
//       <svg width="900" height="620"></svg>
//     );
//   }
// }

// export default SimpleAreaChart;

import React, { Component } from "react";
import * as d3 from "d3";
import NTDOY from "./NTDOY.csv";
import { sliderBottom } from 'd3-simple-slider';

class App extends Component {
    constructor(props){
        super(props)
        this.state = { original_data: [], filtered_data: [] }
    }

    componentDidMount(){
        d3.csv(NTDOY).then((data) => {
            const parseDate = d3.timeParse("%Y-%m-%d");
            data.forEach((d) => {
                d.Date = parseDate(d.Date);
                d.Close = +d.Close;
            });
            this.setState({ original_data: data, filtered_data: data });
        });
    }

    componentDidUpdate() {
        var data = this.state.filtered_data;

        const margin = { top: 70, right: 60, bottom: 50, left: 80 };
        const width = 1000;
        const height = 400;

        // Use innerWidth and innerHeight for the chart area, based on width and height with margins
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const xScale = d3.scaleTime().domain(d3.extent(data, (d) => d.Date)).range([0, innerWidth]);
        const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.Close)]).range([innerHeight, 0]);

        const svg = d3.select("#chart-container").select("svg")
            .attr("width", width) // Use width for parent SVG
            .attr("height", height) // Use height for parent SVG
            .select("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Add the X axis
        svg.selectAll(".x-axis").data([null]).join("g").attr("class", "x-axis").attr("transform", `translate(0,${innerHeight})`).call(d3.axisBottom(xScale));

        // Add the Y axis
        svg.selectAll(".y-axis").data([null]).join("g").attr("class", "y-axis").attr("transform", `translate(${innerWidth},0)`).call(d3.axisRight(yScale).tickFormat(d => isNaN(d) ? "" : `$${d.toFixed(2)}`));

        // Create the area generator function
        var areaGenerator = d3.area().x(d => xScale(d.Date)).y0(yScale(0)).y1(d=> yScale(d.Close));
        var pathData = areaGenerator(data);
        console.log(pathData);


        // Draw the area path
        svg.selectAll('.myareapath').data([null]).join("path").attr("class", 'myareapath').attr("d", pathData).attr("fill", "lightblue");


        // Create the slider
        const sliderRange = sliderBottom()
            .min(d3.min(data, d => d.Date))
            .max(d3.max(data, d => d.Date))
            .width(300)
            .tickFormat(d3.timeFormat('%Y-%m-%d'))
            .ticks(3)
            .default([d3.min(data, d => d.Date), d3.max(data, d => d.Date)])
            .fill('#85bb65')
            .on('onchange', val => {
                const f_data = this.state.original_data.filter(d => d.Date >= val[0] && d.Date <= val[1]);
                this.setState({ filtered_data: f_data });
            });

        // Add the slider to the page
        const gRange = d3.select('.slider-range')
            .attr('width', 500)
            .attr('height', 100)
            .selectAll('.slider-g')
            .data([null])
            .join('g')
            .attr('class', 'slider-g')
            .attr('transform', 'translate(90,30)');

        gRange.call(sliderRange);
    }

    render() {
        return (
            <div>
                <svg className="slider-range"></svg>
                <div id="chart-container"><svg><g></g></svg></div>
            </div>
        );
    }
}

export default App;