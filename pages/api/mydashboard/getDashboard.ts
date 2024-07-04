import axios from '@/lib/axios';

export const getDashboard = async ({ page = 1, size = 5 }) => {
  try {
    const query = `page=${page}&size=${size}`;
    const res = await axios.get(
      `dashboards?navigationMethod=pagination&${query}`,
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
