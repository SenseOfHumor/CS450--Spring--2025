import React, { Component } from 'react';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputText: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({ inputText: event.target.value });
  };

  addTodo = () => {
    this.setState({ todos: [...this.state.todos, this.state.inputText], inputText: ''});
  };

  RemoveTodo = (task) => {
    var filtered_todos = this.state.todos.filter(item => item != task);
    this.setState({todos: filtered_todos});
  };



  render() {
    return (
      <div style={{padding:20}}>
        <p>{this.props.day}</p>
        <input type="text" value={this.state.inputText} onChange={this.handleInputChange} placeholder="Add a todo" />
        <button onClick={this.addTodo}>Add Todo</button>
        {this.state.todos.map(item => <div key={item}>
            <label> {item} </label>
            <button onClick={()=> this.RemoveTodo(item)}>Remove</button>
        </div>)}
      </div>
    );
  }
}

export default TodoList;