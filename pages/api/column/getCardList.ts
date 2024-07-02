import axios from '@/lib/axios';

export const getCardList = async (cardSize: number, columnId: number) => {
  const token = process.env.NEXT_PUBLIC_TOKEN;
  const body = {
    columnId: `${columnId}`,
  };
  const res = await axios.put(
    `cards?size=${cardSize}&columnId=${columnId}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};
