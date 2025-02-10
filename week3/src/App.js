import React, { Component } from "react";
import * as d3 from "d3";

class CircleVisualization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, x: 30, y: 50 },
        { id: 2, x: 80, y: 100 },
        { id: 3, x: 150, y: 30 }
      ]
    };
  }

  updateData = () => {
    const randomNum = Math.floor(Math.random() * 5) + 1;
    const temp_arr = [{ id: 1, x: 50, y: 70 },{ id: 2, x: 120, y: 40 },{ id: 3, x: 140, y: 70 },{ id: 4, x: 120, y: 140 },{ id: 5, x: 80, y: 70 },{ id: 6, x: 80, y: 40 }];
    const newData = temp_arr.slice(randomNum)
    this.setState({ data: newData });
  };

  componentDidMount() {
    d3.select('.container').selectAll('circle').data(this.state.data).join('circle').attr('cx', d => d.x).attr('cy', d => d.y).attr('r', 10).attr('fill', 'grey');

  }

  componentDidUpdate(){
    d3.select('.container').selectAll('circle').data(this.state.data).join(
      enter => enter.append('circle').attr('cx', d => d.x).attr('cy', d => d.y).attr('r', 10).attr('fill', 'green'),
      update => update.attr('cx', d => d.x).attr('cy', d => d.y).attr('r', 10).attr('fill', 'blue'),
      exit => exit.remove(),
    )

    //

  }


  render() {
    return (
      <div>
        <svg className='container' width="200" height="200"></svg>
        <button onClick={this.updateData}>Update Data</button>
      </div>
    );
  }
}

export default CircleVisualization;