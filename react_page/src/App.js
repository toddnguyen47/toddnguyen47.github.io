import React, { Component } from 'react';
import Todos from './components/Todos'
import './App.css';

/** Ref: https://www.youtube.com/watch?v=sBws8MSXN7A*/
class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    todos: [
      {
        id: 1,
        title: "Take out the trash",
        completed: false
      },
      {
        id: 2,
        title: "Dinner with frens",
        completed: true
      },
      {
        id: 3,
        title: "Meet with boss",
        completed: false
      },
    ]
  }

  toggleComplete = (id) => {
    // Iterate through all todo elements
    this.setState({ todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    })});
  }

  render() {
    return (
      <div className="App">
        {/* <header className="">
          App
        </header> */}
  
        <Todos todos={this.state.todos} markComplete={ this.toggleComplete } />
      </div>
    );
  }
}

export default App;
