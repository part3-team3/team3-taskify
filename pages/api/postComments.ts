import { privateApi } from '@/lib/axios';

// const TEAM_ID = '6-3';

interface PostComment {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

async function postComments(body: PostComment) {
  const res = await privateApi.post('comments', body);
  return res;
}

export default postComments;