import axios from 'axios';
import cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API;

const instance = axios.create({
  baseURL: BASE_URL,
});

// 헤더에 쿠키 추가
instance.interceptors.request.use(
  (config) => {
    const token = cookies.get('accessToken'); // 쿠키에서 accessToken 가져오기
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Authorization 헤더에 accessToken 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
