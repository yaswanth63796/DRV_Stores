import api from './api';

export const getBill = (orderId) => api.get(`/api/bills?orderId=${orderId}`).then(res => ({ ...res, data: res.data[0] || null }));
export const generateBill = (orderId, billData) => api.post('/api/bills', billData);
export const deleteBill = (billId) => api.delete(`/api/bills/${billId}`);