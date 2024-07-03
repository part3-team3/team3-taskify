import axios from '@/lib/axios';

export const getCardList = async (columnId: number) => {
  const token = process.env.NEXT_PUBLIC_TOKEN;
  // const body = {
  //   columnId: `${columnId}`,
  // };
  const res = await axios.get(`cards?columnId=${columnId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
