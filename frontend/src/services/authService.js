import api from './api';

export const register = (userData) => api.post('/users', { ...userData, id: Date.now().toString(), username: userData.name });
export const login = (credentials) => {
  return api.get('/users').then(res => {
    const user = res.data.find(u => u.email === credentials.email);
    if (user && credentials.password === 'password123') {
      return { data: { token: 'dummy-token-' + user.id, user } };
    }
    throw new Error('Invalid credentials');
  });
};
export const getProfile = () => {
  const userId = localStorage.getItem('userId');
  return api.get(`/users/${userId}`).then(res => ({ data: { user: res.data } }));
};