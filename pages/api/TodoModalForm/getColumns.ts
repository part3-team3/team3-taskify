import axios from '@/lib/axios';

const getColumns = async () => {
  const res = await axios.get('/columns?dashboardId=10039');

  return res.data.data;
};

export default getColumns;
