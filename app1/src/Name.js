import React, { Component } from 'react';
class Name extends Component {
  constructor(){
    super();
    this.state = {name: ""};
  }

  increment = () => {
    this.setState({count: this.state.count + 1});
  }

  handleInput = (val) => {
    this.setState({name: val});
  }

  render() {
    return (
      <div>
        <p>Enter your name</p>
        <input type='text' onChange={(event)=> this.handleInput(event.target.value)}></input>
        <p>Hello:{this.state.name}</p>
        
      </div>
    );
  }
}

export default Name;