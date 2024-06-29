import { privateApi } from '@/lib/axios';

export const getMembers = async () => {
  const res = await privateApi.get('/members?dashboardId=10039');

  return res.data.members;
};

export default getMembers;
