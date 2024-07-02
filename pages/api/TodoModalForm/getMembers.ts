import axios from '@/lib/axios';

const getMembers = async () => {
  const res = await axios.get('/members?dashboardId=10039');

  return res.data.members;
};

export default getMembers;
