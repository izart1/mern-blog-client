import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:5555',
  baseURL: 'https://mern-blog-api.up.railway.app/',
  // baseURL: '62.113.96.241:5555',
});

instance.interceptors.request.use(config => {
  config.headers.authorization = window.localStorage.getItem('token');
  return config;
});
export default instance;
