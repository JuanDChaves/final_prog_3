const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

export default {
  login: (username, password) => api.post('/admins/login', { username, password }),

  logout: () => api.post('admins/logout'),

  getProducts: () => api.get('/products'),

  getProduct: (id) => api.get(`/products/${id}`),

  createProduct: (data) => api.post('/products', data),

  updateProduct: (id, data) => api.put(`/products/${id}`, data),

  deleteProduct: (id) => api.delete(`/products/${id}`),

  getSales: () => api.get('/sales'),

  createSale: (data) => api.post('/sales', data),
  
   getSaleItems: () => api.get('/sale-items'),

  createSaleItem: (data) => api.post('/sale-items', data),

  getSurveys: () => api.get('/surveys'),

  createSurvey: (data) => api.post('/surveys', data),

  getTopAdminLogs: () => api.get('reports/top-logs'), //

  getMostPurchasedProducts: () => api.get('reports/most-purchased'),  

  getMostExpensiveProducts: () => api.get('reports/most-expensive-products'), 

  getMostLikedProducts: () => api.get('reports/most-liked'),
  
  getAllSales: () => api.get('reports/all-sales'), 

  getMostExpensiveSales: () => api.get('reports/most-expensive-sales'), 

  getMostFrequentProductQuantity: () => api.get('reports/most-frequent-quantity'), 

  getLogsByRange: (from, to) => api.get(`/reports?from=${from}&to=${to}`) //
}