import axios from '@/lib/axios';

export const deleteColumn = async (columnId: number) => {
  await axios.delete(`columns/${columnId}`);
};
