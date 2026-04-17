import api from './api';

export const getOrders = () => api.get('/api/orders');
export const getMyOrders = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return api.get(`/api/orders?userId=${user.id}`);
};
export const createOrder = (orderData) => api.post('/api/orders', orderData);
export const getOrder = (id) => api.get(`/api/orders/${id}`);
export const updateOrderStatus = (id, status) => api.put(`/api/orders/${id}/status`, { status });
export const deleteOrder = (id) => api.delete(`/api/orders/${id}`);