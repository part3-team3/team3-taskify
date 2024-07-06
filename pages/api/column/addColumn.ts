import axios from '@/lib/axios';

export const addColumn = async ({
  title,
  dashboardId,
}: {
  title: string;
  dashboardId: number;
}) => {
  const res = await axios.post('columns', { title, dashboardId });
  return res.data;
};
