import axios from '@/lib/axios';

export const getCardList = async (columnId: number) => {
  const res = await axios.get(`cards?columnId=${columnId}`);
  return res.data;
};
