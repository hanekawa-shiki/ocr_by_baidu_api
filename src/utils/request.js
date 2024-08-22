import axios, { isCancel, AxiosError } from 'axios';

const instance = axios.create({
  baseURL: '',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const { status } = response;
    if (status !== 200) {
      return Promise.reject(response);
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
