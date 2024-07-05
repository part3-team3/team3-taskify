import axios from '@/lib/axios';

export const addColumn = async (dashboardId: number, columnTitle: string) => {
  const body = {
    title: `${columnTitle}`,
    dashboardId: dashboardId,
  };
  const res = await axios.post('columns', body, {});
  return res.data;
};
