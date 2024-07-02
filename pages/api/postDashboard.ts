import axios from '@/lib/axios';

export const getDashboard = async (data: { title: string; color: string }) => {
  try {
    const res = await axios.post(`dashboards`, data);
    return res.data;
  } catch (err) {
    throw new Error('Failed to create dashboard');
  }
};