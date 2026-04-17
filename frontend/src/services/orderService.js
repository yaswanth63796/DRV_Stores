import api from './api';

export const getOrders = () => api.get('/orders');
export const getMyOrders = () => {
  const userId = localStorage.getItem('userId');
  return api.get(`/orders?userId=${userId}`);
};
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getOrder = (id) => api.get(`/orders/${id}`);