import axios from '@/lib/axios';

const getMembers = async (dashboardId: number) => {
  const res = await axios.get(`/members?dashboardId=${dashboardId}`);

  return res.data.members;
};

export default getMembers;
