const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

export default {
  login: (username, password) => api.post('/admins/login', { username, password }),

  getProducts: () => api.get('/products'),

  getProduct: (id) => api.get(`/products/${id}`),

  createProduct: (data) => api.post('/products', data),

  updateProduct: (id, data) => api.put(`/products/${id}`, data),

  deleteProduct: (id) => api.delete(`/products/${id}`),
}

/*

const api2 = {

  login: async (username, password) => {
    const res = await fetch(`${BASE_URL}/admins/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include'  // ← this is all you need for cookies
    });
    return res.json();
  },

  // Products
  getProducts: async () => {
    const res = await fetch(`${BASE_URL}/products`);
    return res.json();
  },

  getProduct: async (id) => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    return res.json();
  },

  createProduct: async (data) => {
    const res = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updateProduct: async (id, data) => {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteProduct: async (id) => {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  }
};

*/