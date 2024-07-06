import axios from '@/lib/axios';

export const getCard = async () => {
  const res = await axios.get('cards/8736');
  return res.data;
};
