// // import React, { Component } from "react";
// // import * as d3 from "d3";

// // class StackComp extends Component {
// //   componentDidMount() {
// //     const data = [
// //       { month: new Date(2023, 0, 1), coffee: 25, tea: 15, juice: 10 },
// //       { month: new Date(2023, 1, 1), coffee: 30, tea: 20, juice: 15 },
// //       { month: new Date(2023, 2, 1), coffee: 35, tea: 25, juice: 20 },
// //       { month: new Date(2023, 3, 1), coffee: 75, tea: 35, juice: 50 },
// //       { month: new Date(2023, 4, 1), coffee: 70, tea: 10, juice: 25 },
// //       { month: new Date(2023, 5, 1), coffee: 35, tea: 25, juice: 10 },
// //       { month: new Date(2023, 6, 1), coffee: 45, tea: 35, juice: 80 },
// //       { month: new Date(2023, 7, 1), coffee: 55, tea: 25, juice: 90 }
// //     ];

// //     const maxSum = d3.sum([
// //       d3.max(data, d => d.coffee),
// //       d3.max(data, d => d.tea),
// //       d3.max(data, d => d.juice)
// //     ]);

// //     const margin = { top: 20, right: 20, bottom: 50, left: 50 },
// //       width = 600 - margin.left - margin.right,
// //       height = 400 - margin.top - margin.bottom;

// //     const xScale = d3.scaleTime().domain(d3.extent(data, d => d.month)).range([0, width]),
// //       yScale = d3.scaleLinear().domain([0, maxSum]).range([height, 0]);

// //     const colorScale = d3.scaleOrdinal().domain(["coffee", "tea", "juice"]).range(["brown", "green", "orange"]);

// //     // create stackGenerator
// //     var stackGenerator = d3.stack().keys(["coffee", "tea", "juice"]).offset(d3.stackOffsetWiggle) // specify the keys to stack
// //     var stackSeries = stackGenerator(data)
// //     console.log(stackSeries)

// //     // create areaGen
// //     var areaGen = d3.area().x(d => xScale(d.data.month)).y0(d => yScale(d[0])).y1(d => yScale(d[1])) // d[0] and d[1] are the start and end of the area for each stack

// //     const svg = d3.select(".container").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
// //     const chartGroup = svg.selectAll(".chart-group").data([null]).join("g").attr("class", "chart-group").attr("transform", `translate(${margin.left}, ${margin.top})`);

// //     // Draw areas
// //     chartGroup.selectAll(".myareachart")
// //     .data(stackSeries) // pass in the stack series
// //     .join("path") // create a path for each stack
// //     .attr("class", "myareachart") // for styling
// //     .attr("d", d=>{
// //       console.log(areaGen(d)) // d is each stack series
// //       return areaGen(d)
// //     }) // use the area generator
// //     .attr("fill", d=> colorScale(d.key))


// //     // Draw x-axis
// //     chartGroup.selectAll(".x-axis").data([null]).join("g").attr("class", "x-axis").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(xScale).ticks(d3.timeMonth.every(1)).tickFormat(d3.timeFormat("%b")));
// //     // Draw y-axis
// //     chartGroup.selectAll(".y-axis").data([null]).join("g").attr("class", "y-axis").call(d3.axisLeft(yScale).ticks(5));
// //   }

// //   render() {
// //     return <svg className="container"></svg>;
// //   }
// // }

// // export default StackComp;


// import React, { Component } from "react";
// import * as d3 from "d3";

// class StackComp extends Component {
//   componentDidMount() {
//     var data = [
//       { month: new Date(2023, 0, 1), coffee: 25, tea: 15, juice: 10 },
//       { month: new Date(2023, 1, 1), coffee: 30, tea: 20, juice: 15 },
//       { month: new Date(2023, 2, 1), coffee: 35, tea: 25, juice: 20 }
//     ];

//     var xScale = d3.scaleBand().domain(data.map(d => d.month)).range([50, 275]).padding(0.2),
//           yScale = d3.scaleLinear().domain([0, 80]).range([275, 25]),
//           colorScale = d3.scaleOrdinal().domain(["coffee", "tea", "juice"]).range(["brown", "green", "orange"])

//     var stackGen = d3.stack().keys(["coffee", "tea", "juice"]),
//         stackedSeries = stackGen(data);

//     console.log(stackedSeries)

//    // Draw rectangles
//    d3.select(".container").selectAll('g').data(stackedSeries).join('g').attr("fill",d=>colorScale(d.key))
//    .selectAll('rect').data(d=>d).join('rect').attr("x",d=>xScale(d.data.month))
//    .attr("y",d=>yScale(d[1])).attr("height",d=>yScale(d[0])-yScale(d[1]))
//    .attr("width",xScale.bandwidth())


//     d3.select(".x-axis").attr("transform", "translate(0, 275)").call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b")));
//     d3.select(".y-axis").attr("transform", "translate(50, 0)").call(d3.axisLeft(yScale).ticks(5));
//   }

//   render() {
//     return (
//       <svg style={{ width: 400, height: 600 }}>
//         <g className="container"></g>
//         <g className="x-axis"></g>
//         <g className="y-axis"></g>
//       </svg>
//     );
//   }
// }
// export default StackComp;


// import React, { Component } from "react";
// import * as d3 from "d3";

// class TreeMap extends Component {
//   componentDidMount() {
//     const data = {
//       "name": "A1",
//       "children": [
//         {
//           "name": "B1",
//           "children": [
//             { "name": "C1", "value": 100 },
//             { "name": "C2", "value": 300 },
//             { "name": "C3", "value": 200 }
//           ]
//         },
//         { "name": "B2", "value": 200 }
//       ]
//     };


//     // Hierarchy setup with value summing
//     const h_data = d3.hierarchy(data).sum(d => d.value); //.sum() traverses the tree and sets .value on each node to be the sum of its children.
//     console.log(h_data)

//     // Define the treemap layout
//     const treemapLayout = d3.treemap().size([400, 200]).paddingOuter(16);

//     // Compute the treemap layout
//     treemapLayout(h_data);

//     // Select the container and join groups for each node
//     d3.select('.container').selectAll('g').data(h_data.descendants()).join('g').attr("transform",d=>`translate(${d.x0},${d.y0})`)
//     .attr('add_rects',function(d){
//         d3.select(this).selectAll('rect').data([null]).join("rect").attr('width',d.x1-d.x0).attr('height',d.y1-d.y0).attr('fill','gray').attr("stroke",'white')
//     })
//     .attr('add_text',function(d){
//         d3.select(this).selectAll('text').data([null]).join("text").text(d.data.name).attr('dx',3).attr('dy',17).style('font-size',12)
//     })


//   }

//   render() {
//     return (
//       <svg className="container" width="400" height="200"></svg>
//     );
//   }
// }

// export default TreeMap;

// import React, { Component } from "react";
// import * as d3 from "d3";

// class App extends Component {
//     componentDidMount() {
//         const data = {
//             "name": "Root",
//             "children": [
//                 {
//                     "name": "Branch 1",
//                     "children": [
//                         { "name": "Leaf 1", "size": 10, "color": "red" },
//                         { "name": "Leaf 2", "size": 20, "color": "blue" }
//                     ]
//                 },
//                 {
//                     "name": "Branch 2",
//                     "children": [
//                         { "name": "Leaf 3", "size": 15, "color": "green" },
//                         { "name": "Leaf 4", "size": 25, "color": "purple", "children": [{ "name": "Subleaf", "size": 5, "color": "orange" }] }
//                     ]
//                 }
//             ]
//         };

//         const width = 400;
//         const height = 100;
//         const h_data = d3.hierarchy(data);
//         console.log(h_data)
//         const treeLayout = d3.tree().size([width, height]); // returns a layout function into which we can pass a hierarchy object.
//         treeLayout(h_data); // Generates layout positions for nodes and links
//         console.log(h_data)

//         // draw the links (lines)
//         d3.select(".parent")
//         .selectAll("line")
//         .data(h_data.links())
//         .join("line")
//         .attr("x1", d => d.source.x)
//         .attr("y1", d => d.source.y)
//         .attr("x2", d => d.target.x)
//         .attr("y2", d => d.target.y)
//         .attr("stroke", 'black')
//         .attr("stroke-width", 1);

//         // draw the nodes (circles)
//         d3.select(".parent")
//         .selectAll("circle")
//         .data(h_data.descendants())
//         .join("circle")
//         .attr("r", 10)
//         .attr("cx", d => d.x)
//         .attr("cy", d => d.y)
//         .attr("fill", 'green')

//         // draw the text labels
//         d3.select(".parent")
//         .selectAll("text")
//         .data(h_data.descendants())
//         .join("text")
//         .text(d => d.data.name) // use the name from the data
//         .attr("dx", d => {
//           if( d.data.name == "Root"){
//             return d.x - 10;
//           }
//           return d.x + 12
//         })
//         .attr("dy", d => {
//           if (d.data.name == "Root") {
//             return d.y - 20; // for the root, position it above the circle
//           }

          

//           return d.y + 4; // for other nodes, position it below the circle
//         }) // position the text slightly offset from the circle
//         .style("font-size", 10)
//     }

//     render() {
//         return (
//             <svg style={{ width: 500, height: 700,marginTop:100 }}><g className="parent" transform="translate(30,30)"></g></svg>
//         );
//     }
// }

// export default App;


import React, { Component } from "react";
import * as d3 from "d3";

class TreeMap extends Component {
  componentDidMount() {
    const data = {
      "name": "A1",
      "children": [
        {
          "name": "B1",
          "children": [
            { "name": "C1", "value": 100 },
            { "name": "C2", "value": 300 },
            { "name": "C3", "value": 200 }
          ]
        },
        { "name": "B2", "value": 200 }
      ]
    };


    // Hierarchy setup with value summing
    const h_data = d3.hierarchy(data).sum(d => d.value); //.sum() traverses the tree and sets .value on each node to be the sum of its children.
    console.log(h_data)

    // Define the treemap layout
    const treemapLayout = d3.treemap().size([400, 200]).paddingOuter(16);

    // Compute the treemap layout
    treemapLayout(h_data);

    // Select the container and join groups for each node
    d3.select('.container').selectAll('g').data(h_data.descendants()).join('g').attr("transform",d=>`translate(${d.x0},${d.y0})`)
    .attr('add_rects',function(d){
        d3.select(this).selectAll('rect').data([null]).join("rect").attr('width',d.x1-d.x0).attr('height',d.y1-d.y0).attr('fill','gray').attr("stroke",'white')
    })
    .attr('add_text',function(d){
        d3.select(this).selectAll('text').data([null]).join("text").text(d.data.name).attr('dx',3).attr('dy',17).style('font-size',12)
    })


  }

  render() {
    return (
      <svg className="container" width="400" height="200"></svg>
    );
  }
}

export default TreeMap;