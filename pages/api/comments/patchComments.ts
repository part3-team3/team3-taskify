import { privateApi } from '@/lib/axios';

const patchComment = async ({ commentId, body }) => {
  const res = await privateApi.patch(`comments/${commentId}`, body);
  return res.data;
};

export default patchComment;
