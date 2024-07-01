import { privateApi } from '@/lib/axios';

export const getCard = async () => {
  const res = await privateApi.get('cards/8736');
  return res.data;
};
