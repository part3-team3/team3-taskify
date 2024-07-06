import axios from '@/lib/axios';

export const getCard = async (cardId: number) => {
  const res = await axios.get(`cards/${cardId}`);
  return res.data;
};
