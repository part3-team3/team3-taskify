import axios from '@/lib/axios';

export const getCardList = async (columnId = 33798) => {
  const res = await axios.get(`cards?columnId=${columnId}`);
  return res.data;
};
