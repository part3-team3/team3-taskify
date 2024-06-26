import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API;

const instance = axios.create({
  baseURL: BASE_URL,
});

export default instance;

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk3NiwidGVhbUlkIjoiNi0zIiwiaWF0IjoxNzE5MjAwODQzLCJpc3MiOiJzcC10YXNraWZ5In0.ybVvT21thF6vjcG5ReI_XlIHCSn45HoFt6FTWKYYAm8';
export const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});
