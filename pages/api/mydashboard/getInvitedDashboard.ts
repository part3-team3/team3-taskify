import axios from '@/lib/axios';


export const getInvitedDashboard = async (cursorId?:number) => {
  try {
    const res = await axios.get(`invitations`, { params: { size:6, cursorId:cursorId} });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getSearchDashboard = async (query: string) => {
  try {
    const res = await axios.get(`invitations`, { params: { title: query } });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};