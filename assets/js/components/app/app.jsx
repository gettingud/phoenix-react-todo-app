import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItemButton from '../add-item-button';

import ApiService from '../../services/api-service';

import './app.css';

export default class App extends Component {
  apiService = new ApiService();

  state = {
    items: [],
    searchInput: null,
    statusFilter: null
  };

  constructor() {
    super();
    this.buildItems();
  }

  buildItems = () => {
    this.apiService
        .getAllItems()
        .then(this.onItemsLoaded)
        .catch(this.onError);
  }

  onItemsLoaded = (items) => {
    this.setState({items});
  }

  onDeleteItem = (id) => {
    this.apiService.deleteItem(id)
                   .then(this.deleteItem)
                   .catch(this.onError)
  };

  deleteItem = (id) => {
    this.setState(({ items }) => {
      const filteredItems = items.filter((item) => item.id !== id);
      
      return {
        items: filteredItems
      };
    })
  }
  
  addItem = (item) => {
    this.setState(({ items }) => {
      const newitems = items.concat([this.createTodoItem(item)]);

      return {
        items: newitems
      };
    });
  };

  createTodoItem(item) {
    return {
      label: item.label,
      important: item.important,
      done: item.done,
      id: item.id
    }
  }

  onToggleImportant = (item) => {
    this.apiService.updateItem(item.id, {important: !item.important})
                   .then((item) => this.toggleProperty(item, 'important'))
  }
  
  onToggleDone = (item) => {
    this.apiService.updateItem(item.id, {done: !item.done})
                   .then((item) => this.toggleProperty(item, 'done'))
  }

  toggleProperty = (item, propName) => {
    this.setState(({ items }) => {
      return {
        items: this.onToggleProperty(items, item.id, propName)
      }
    });
  }

  onToggleProperty = (array, id, propName) => {
    const itemIndex = array.findIndex((item) => item.id === id );

    const oldItem = array[itemIndex];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    const newArray = array.filter((item) => item.id !== id);
    newArray.splice(itemIndex, 0, newItem);

    return newArray;
  }

  onSearch = (event) => {
    this.setState({searchInput: event.target.value})
  }

  applySearch = (items) => {
    const { searchInput } = this.state;

    if (searchInput) {
      return items.filter((item) => item.label.toLowerCase().includes(searchInput.toLowerCase()));
    } else {
      return items;
    }
  }

  onStatusChange = (event) => {
    this.setState({statusFilter: event.target.name})
  }

  applyFilter = (items) => {
    const { statusFilter } = this.state;

    switch(statusFilter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  render() {
    const { statusFilter, items } = this.state;
    const doneCount = items.filter((item) => item.done).length;
    const todoCount = items.filter((item) => !item.done).length;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onChange={this.onSearch}/>
          <ItemStatusFilter currentFilterName={statusFilter} onStatusChange={this.onStatusChange}/>
        </div>
  
        <TodoList todos={ this.applyFilter(this.applySearch(items)) }
                  onDeleted={ this.onDeleteItem }
                  onToggleImportant={ this.onToggleImportant }
                  onToggleDone={ this.onToggleDone } />
        <AddItemButton onAddItem={ this.addItem }/>
      </div>
    );
  }
};