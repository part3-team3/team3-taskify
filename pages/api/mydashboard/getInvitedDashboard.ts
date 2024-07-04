import axios from '@/lib/axios';


export const getInvitedDashboard = async (query:string) => {
  try {
    const res = await axios.get(`invitations`, { params: { title: query } });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};