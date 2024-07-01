import { privateApi } from '@/lib/axios';

interface PostComment {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

const postComments = async (body: PostComment) => {
  const res = await privateApi.post('comments', body);
  return res;
};

export default postComments;
