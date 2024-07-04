import axios from '@/lib/axios';

export const getColumn = async (dashboardId: number) => {
  const res = await axios.get(
    `columns?dashboardId=${dashboardId}`,
  );
  return res.data;
};
