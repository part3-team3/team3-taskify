import axios from '@/lib/axios';

export const getColumnList = async (dashboardId: string) => {
  const token = process.env.NEXT_PUBLIC_TOKEN;
  const res = await axios.get(`columns?dashboardId=${dashboardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
