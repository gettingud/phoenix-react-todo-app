import React, { Component } from 'react';

export default class ItemStatusFilterButton extends Component {
  render() {
    const { name, label, className, onStatusChange } = this.props;

    return (
      <button type="button"
              className={className}
              name={name}
              onClick={onStatusChange}>
        {label}
      </button>
    )
  }
}