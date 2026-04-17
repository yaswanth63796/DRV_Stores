import api from './api';

export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (productData) => api.post('/products', { ...productData, id: Date.now().toString() });
export const updateProduct = (id, productData) => api.put(`/products/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const getLowStockProducts = () => api.get('/products').then(res => ({
  ...res,
  data: res.data.filter(p => p.stock < 10)
}));