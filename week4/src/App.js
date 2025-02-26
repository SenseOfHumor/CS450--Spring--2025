// import React, { Component } from "react";
// import * as d3 from "d3";

// class App extends Component {
//   componentDidMount() {
//     const data = [
//       { x: 2000, salary: 20, level: 'low' },
//       { x: 6000, salary: 150, level: 'high' },
//       { x: 10000, salary: 100, level: 'medium' },
//       { x: 10000, salary: 200, level: 'medium2' },
//       { x: 10000, salary: 500, level: 'medium20' },
//     ];

//     console.log(data.map(item => item.level));  // Output: ['low', 'high', 'medium', 'medium2']

//     var mycats = data.map(item => item.level);

//     var bandScale = d3.scaleBand()
//     .domain(mycats)
//     .range([0, 600])
//     .padding(0.1);  // Space between bands

//     console.log(bandScale("B"));  // Output: x position of band "B"
//     console.log(bandScale.bandwidth());  // Output: width of each band

//     d3.selectAll('svg')
//     .selectAll('rect')
//     .data(data)
//     .join('rect')
//     .attr('x', 20)
//     .attr('y', d => bandScale(d.level))
//     .attr('height', bandScale.bandwidth())
//     .attr('width', d => d.salary)
//     .attr('fill', 'blue')




// }

//   render() {
//     return (
//         <svg className="mysvg" width="760" height="600">
          
//         </svg>
//     );
//   }
// }

// export default App;



// import React, { Component } from "react";
// import * as d3 from "d3";

// class App extends Component {
//   componentDidMount() {
//     var width=500
//     var margin={left:20,right:10}
//     var xScale = d3.scaleLinear().domain([0, 100]).range([margin.left, width-margin.right]);
//     var xAxisGenerator = d3.axisBottom(xScale);
//     // d3.select("svg").call(xAxisGenerator);
//     xAxisGenerator.tickValues([0, 20, 40]);
//     d3.select("svg").selectAll("g").data([null]).join('g').attr("transform",'translate(0,400)').call(xAxisGenerator);
//     d3.select('.domain').attr('stroke','red').attr('stroke-width',2);
//     d3.selectAll('.tick text').attr('fill','blue');
//     d3.selectAll('.tick line').attr('stroke','green').attr('stroke-width',10);
//   }
//   render() {
//     return (
//         <svg width="500px" height="500px"></svg>
//     );
//   }
// }

// export default App;





// import React, { Component } from "react";
// import * as d3 from "d3";

// class App extends Component {
//   componentDidMount() {
//     const margin = { top: 40, right: 50, bottom: 50, left: 50 };
//     const width = 600;
//     const height = 400;
//     const innerWidth = width - margin.left - margin.right;
//     const innerHeight = height - margin.top - margin.bottom;

//     const data = [
//       { x: 1000, y: 20 }, { x: 3000, y: 40 }, { x: 5000, y: 80 },
//       { x: 1700, y: 100 }, { x: 2090, y: 60 }, { x: 3100, y: 120 }
//     ];

//     const svg = d3.select(".container").attr("width", width).attr("height", height);

//     const innerChart = svg.select(".inner_chart").attr("transform", `translate(${margin.left}, ${margin.top})`);

//     const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.x)]).range([0, innerWidth]);

//     const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.y)]).range([innerHeight, 0]);

//     const xAxis = d3.axisBottom(xScale);
//     const yAxis = d3.axisLeft(yScale);

//     innerChart.selectAll(".x-axis").data([null]) // Just a placeholder for the axis, as we're not using dynamic data for it.
//       .join("g").attr('class','x-axis') //we have to assign the class we use for selection
//       .attr("transform", `translate(0, ${innerHeight})`)
//       .call(xAxis);

//     innerChart.selectAll(".y-axis").data([null]) // Similarly, just a placeholder for the axis.
//       .join("g").attr('class','y-axis') //we have to assign the class we use for selection
//       .call(yAxis);

//     innerChart.selectAll("circle").data(data).join("circle").attr("r", 5).attr("fill", "gray")
//       .attr("cx", d => xScale(d.x)).attr("cy", d => yScale(d.y))

//     d3.select(".y-axis").selectAll(".tick line").attr("x2", innerWidth).attr("stroke-dasharray", "2,2").attr("stroke", "red");
//     d3.select(".x-axis").selectAll(".tick line").attr("y1", -innerHeight).attr("stroke-dasharray", "2,2").attr("stroke", "blue");

//   }

//   render() {
//     return (
//       <svg className="container">
//         <g className="inner_chart"></g>
//       </svg>
//     );
//   }
// }

// export default App;







// import React, { Component } from "react";
// import * as d3 from "d3";

// class App extends Component {
//   constructor() {
//     super()
//     this.state = {
//       selected_data: [],
//       data: [
//         { "id": 10, "salary": 129, "name": "Alice" },
//         { "id": 15, "salary": 205, "name": "Bob" },
//         { "id": 20, "salary": 373, "name": "Charlie" },
//         { "id": 30, "salary": 89, "name": "David" },
//         { "id": 40, "salary": 243, "name": "Emma" },
//         { "id": 50, "salary": 188, "name": "Frank" },
//         { "id": 56, "salary": 400, "name": "Grace" },
//         { "id": 67, "salary": 125, "name": "Hannah" },
//         { "id": 80, "salary": 375, "name": "Ian" },
//         { "id": 90, "salary": 200, "name": "Jack" },
//         { "id": 100, "salary": 301, "name": "Katie" },
//         { "id": 110, "salary": 87, "name": "Leo" },
//         { "id": 120, "salary": 144, "name": "Mia" },
//         { "id": 130, "salary": 289, "name": "Noah" },
//         { "id": 140, "salary": 315, "name": "Olivia" }
//       ]
           
//     }
//   }
//   componentDidMount() {
//     this.renderChart()
//   }
//   componentDidUpdate() {
//     this.renderChart()
//   }
  
// renderChart = () => {
//     var data = this.state.data
//     d3.select("svg").selectAll("circle").data(data).join("circle").attr("cx", (d) => d.id).attr("cy", (d) => d.salary).attr("r", 4)
//     .attr("fill", d=>{
//         var selected_ids = this.state.selected_data.map(item=>item.id)
//         if(selected_ids.includes(d.id)){
//             return "red"
//         }
//         else{
//             return "gray"
//         }
//     })

//     var brush = d3.brush().on('start brush', (e) => {
//         var filtered_data = data.filter(item=>{
//             return item.id >= e.selection[0][0] && item.id <= e.selection[1][0] && item.salary >= e.selection[0][1] && item.salary <= e.selection[1][1]
//         })
//         this.setState({ selected_data: filtered_data})
//     });

//     // attach the brush to the svg
//     d3.select('svg').call(brush)
  

//   }    

//   render() {
//     return <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"center",padding:20}}>
//       <svg width="200" height="420"><g></g></svg>
//       <div> {this.state.selected_data.map(item=><p>{item.name+"----"+item.salary}</p>)}</div>
//     </div>;
//   }
// }

// export default App;




// import React, { Component } from "react";
// import * as d3 from "d3";

// class App extends Component {
//   constructor(){
//     super()
//     this.state = {
//                   data: [{ id: 0, x: 182, y: 129 }, { id: 1, x: 315, y: 205 }, { id: 2, x: 512, y: 373 }, { id: 3, x: 124, y: 89 }, { id: 4, x: 405, y: 243 },{ id: 5, x: 302, y: 188 }, { id: 6, x: 515, y: 400 }, { id: 7, x: 220, y: 125 }, { id: 8, x: 350, y: 375 }, { id: 9, x: 150, y: 200 }, { id: 10, x: 432, y: 301 }, { id: 11, x: 124, y: 87 }, { id: 12, x: 190, y: 144 }, { id: 13, x: 478, y: 289 }, { id: 14, x: 250, y: 315 }]
//                 }
//   }
//   componentDidMount() {
//     this.renderChart()
//   }
//   componentDidUpdate(){
//     this.renderChart()
// }
// renderChart = () => {

// d3.select('g').selectAll('circle').data(this.state.data).join('circle').attr('cx', d => d.x).attr('cy', d => d.y).attr('r', 5);

//     var zoom = d3.zoom().on('zoom', (e) => {
//         d3.select('g').attr('transform', e.transform);
//     })

//     zoom.scaleExtent([1, 10]); // Set the zoom scale extent
  
//     d3.select('svg').call(zoom);
//   }    


//   render() {
//     return <svg width="600" height="600"><g></g></svg>;
//   }
// }

// export default App;


import React, { Component } from "react";
import * as d3 from "d3";

class App extends Component {

  componentDidMount() {

    var data = [{ id: 0, x: 182, y: 129 }, { id: 1, x: 280, y: 105 }, { id: 2, x: 300, y: 273 }, { id: 3, x: 150, y: 250 }, { id: 4, x: 405, y: 243 },{ id: 5, x: 302, y: 188 }, ]

    d3.select('svg').selectAll('circle').data(data).join('circle').attr('cx', (d) => d.x).attr('cy', (d) => d.y).attr('r', 40)

    var drag = d3.drag().on('drag', function(e){
        var current_x = +d3.select(this).attr('cx')
        var current_y = +d3.select(this).attr('cy')

        d3.select(this).attr('cx', current_x + e.dx).attr('cy', current_y + e.dy)

        
       });

       d3.select('svg').selectAll('circle').call(drag)
  }    

  render() {
    return <svg width="900" height="600"></svg>;
  }
}

export default App;
