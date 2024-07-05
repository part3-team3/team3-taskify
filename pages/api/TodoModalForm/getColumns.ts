import axios from '@/lib/axios';

const getColumns = async (dashboardId: number) => {
  const res = await axios.get(`/columns?dashboardId=${dashboardId}`);

  return res.data.data;
};

export default getColumns;
