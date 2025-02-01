import React, { Component } from 'react';
import Child from './Child';

class App extends Component {
  arr1 = [{name: "James", age: 20}, {name: "Jassica", age: 30}];
  render() {
    return (
      <div>
        <Child day="Saturday"></Child>
        <Child day="Sunday"></Child>
        <Child day="Monday"></Child>
      </div>
    );
  }
}
export default App;