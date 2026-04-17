import api from './api';

export const getOrders = () => api.get('/orders');
export const getMyOrders = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return api.get(`/orders?userId=${user.id}`);
};
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getOrder = (id) => api.get(`/orders/${id}`);