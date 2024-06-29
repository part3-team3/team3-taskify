import { privateApi } from '@/lib/axios';

export const getComments = async (cursorId?: number) => {
  const res = await privateApi.get(
    `comments?size=10&cardId=8736${cursorId ? '&cursorId=' + cursorId : ''}`,
  );
  return res.data;
};
