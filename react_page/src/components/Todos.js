import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

/** Ref: https://www.youtube.com/watch?v=sBws8MSXN7A*/
class Todos extends Component {
  state = {

  }

  render() {
    console.log(this.props.todos);
    return this.props.todos.map( (todoElem) => (
      <TodoItem key={ todoElem.id } todoElem={ todoElem } markComplete={ this.props.markComplete }/>
    ));
  }
}

// Prop Types
Todos.propTypes = {
  todos: PropTypes.array.isRequired
}

export default Todos;
