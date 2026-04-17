import api from './api';

export const register = (userData) => api.post('/api/users/register', userData);
export const login = (credentials) => api.post('/api/users/login', credentials);