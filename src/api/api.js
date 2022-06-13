import axios from 'axios';
import getToken from './getToken';

const api = axios.create({
  baseURL: `https://nestjs-cloud-todolist.herokuapp.com`,
});

api.interceptors.request.use (
  function (config) {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject (error);
  }
);

export default api;
