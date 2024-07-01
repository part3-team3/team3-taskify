import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API;

const instance = axios.create({
  baseURL: BASE_URL,
});

export default instance;

const TOKEN = process.env.NEXT_PUBLIC_TOKEN;

export const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});
