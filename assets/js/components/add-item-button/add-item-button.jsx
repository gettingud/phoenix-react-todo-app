import React, { Component }  from 'react';
import ApiService from '../../services/api-service';

export default class AddItemButton extends Component {
  apiService = new ApiService();

  state = {
    label: '',
    categories: [],
    chosenCategory: {}
  }

  constructor() {
    super();
    this.buildCategories()
  }

  buildCategories = () => {
    this.apiService
        .getAllCategories()
        .then(this.onCategoriesLoaded)
        .catch(this.onError);
  }
  
  onCategoriesLoaded = (categories) => {
    this.setState({categories, chosenCategory: categories[0]});
  }

  onLabelChange = (event) => {
    this.setState({label: event.target.value});
  }

  onCategoryChange = (event) => {
    this.setState({chosenCategory: event.target.value});
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.apiService.createItem({label: this.state.label, category_id: this.state.chosenCategory.id})
                   .then(this.addItem)
                   .catch(this.onError);
  }

  addItem = (item) => {
    this.props.onAddItem(item);
    this.setState({label: ''});
  }

  onError = (_err) => {
    this.setState({
      loading: false,
      error: true
    });
  };

  render() {
    const { label, categories, chosenCategory } = this.state;

    return (
      <form className="d-flex"
            onSubmit={this.onSubmit} >
        <input type="text"
               className="form-control"
               onChange={this.onLabelChange}
               placeholder="What needs to be done?"
               value={ label } />
        <select className="custom-select w-25" value={chosenCategory.title} onChange={this.onCategoryChange}>
          {categories.map((category) => <option key={category.id}>{category.title}</option>)}
        </select>
        <input className="btn btn-primary" type="submit" value="Add"/>
      </form>
    )
  }
}