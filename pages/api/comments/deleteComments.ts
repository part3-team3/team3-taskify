import { privateApi } from '@/lib/axios';

const deleteComment = async (commentId: number) => {
  await privateApi.delete(`/comments/${commentId}`);
};

export default deleteComment;
