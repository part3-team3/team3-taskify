import axios from '@/lib/axios';

export const deleteColumn = async (columnId: number) => {
  const token = process.env.NEXT_PUBLIC_TOKEN;

  const res = await axios.delete(`columns/${columnId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
