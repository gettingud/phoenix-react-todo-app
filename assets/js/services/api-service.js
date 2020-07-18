export default class ApiService {
  _apiBase = 'http://localhost:4000/api';
  
  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
  
    const body = await res.json();
    return body;
  }

  async createResource(url, params) {
    const res = await fetch(`${this._apiBase}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }  
    const body = await res.json();
    return body;
  }

  async updateResource(url, id, params) {
    const res = await fetch(`${this._apiBase}${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }  
    const body = await res.json();
    return body;
  }

  async deleteResource(url, id) {
    const res = await fetch(`${this._apiBase}${url}/${id}`, {method: 'DELETE'});
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
  }

  async getAllItems() {
    const res = await this.getResource('/items/');
    return res.data;
  }

  async getAllCategories() {
    const res = await this.getResource('/categories/');
    return res.data;
  }

  async createItem(attributes) {
    const res = await this.createResource('/items/', {item: attributes});
    return res.data;
  }

  async updateItem(id, attributes) {
    const res = await this.updateResource('/items', id, {item: attributes});
    return res.data;
  }

  async deleteItem(id) {
    await this.deleteResource('/items', id);
    return id;
  }
}