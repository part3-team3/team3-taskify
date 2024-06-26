import axios from 'axios';


const BASE_URL = process.env.NEXT_PUBLIC_API;
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk3NywidGVhbUlkIjoiNi0zIiwiaWF0IjoxNzE5MjAyMzAxLCJpc3MiOiJzcC10YXNraWZ5In0.f3VkmboOJR0E4V8GsWakumcqKFy4v0osOOtOj1KVbEM';
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
});

export default instance;