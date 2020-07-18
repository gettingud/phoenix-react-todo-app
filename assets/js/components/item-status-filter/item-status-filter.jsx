import React, { Component } from 'react';
import ItemStatusFilterButton from '../item-status-filter-button';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  buttonsData = [
    { name: 'all', label: 'All'},
    { name: 'active', label: 'Active'},
    { name: 'done', label: 'Done'}
  ]

  render() {
    const { currentFilterName, onStatusChange } = this.props;

    const buttons = this.buttonsData.map(({name, label}) => {
      let isActive = name === currentFilterName
      let buttonClassName = 'btn';

      if (isActive) {
        buttonClassName += ' btn-info'
      } else {
        buttonClassName += ' btn-outline-secondary'
      }

      return <ItemStatusFilterButton key={name}
                                     className={buttonClassName}
                                     label={label}
                                     name={name}
                                     onStatusChange={onStatusChange}/>
    });
    
    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }
}