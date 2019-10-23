import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
  getStyle = () => {
    return {
      backgroundColor: "#f4f4f4",
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: this.props.todoElem.completed ?
        'line-through' : 'none'
    }
  }

  render() {
    // Destructuring
    const { id, title } = this.props.todoElem;

    return (
      // Double braces
      // <div style={{ backgroundColor: "#f4f4f4" }}>

      // Single braces
      <div style={ this.getStyle() }>
        <p>
          <input type="checkbox"
          onChange={ this.props.markComplete.bind(this, id) } /> {' '}
          { this.props.todoElem.title }
        </p>
      </div>
    )
  }
}

// Prop Types
TodoItem.propTypes = {
  todoElem: PropTypes.object.isRequired
}

export default TodoItem;

