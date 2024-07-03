import axios from 'axios';
import cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API;

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = cookies.get('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // 리프레시 토큰을 사용해 새로운 액세스 토큰을 발급받는 함수 호출
      const newToken = await refreshToken();
      if (newToken) {
        cookies.set('accessToken', newToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);

async function refreshToken() {
  try {
    const response = await axios.post(`${BASE_URL}/auth/refresh`, {
      token: cookies.get('refreshToken'),
    });
    return response.data.accessToken;
  } catch (error) {
    console.error('Failed to refresh token', error);
    return null;
  }
}

export default instance;
