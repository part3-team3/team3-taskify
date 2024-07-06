import axios from '@/lib/axios';

export const getComments = async (cardId: number, cursorId?: number) => {
  const res = await axios.get(
    `comments?size=10&cardId=${cardId}${cursorId ? '&cursorId=' + cursorId : ''}`,
  );
  return res.data;
};
