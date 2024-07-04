import axios from '@/lib/axios';

export const editColumn = async (columnId: number, title: string) => {
  const body = {
    title: `${title}`,
  };
  const res = await axios.put(`columns/${columnId}`, body);
  return res.data;
};
