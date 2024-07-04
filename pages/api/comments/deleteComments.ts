import axios from '@/lib/axios';

const deleteComment = async (commentId: number) => {
  await axios.delete(`/comments/${commentId}`);
};

export default deleteComment;
