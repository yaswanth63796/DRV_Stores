import api from './api';

export const getProducts = () => api.get('/api/products');
export const getProduct = (id) => api.get(`/api/products/${id}`);
export const createProduct = (productData) => api.post('/api/products', productData);
export const updateProduct = (id, productData) => api.put(`/api/products/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/api/products/${id}`);
export const getLowStockProducts = () => api.get('/api/products').then(res => ({
  ...res,
  data: res.data.filter(p => p.stock < 10)
}));