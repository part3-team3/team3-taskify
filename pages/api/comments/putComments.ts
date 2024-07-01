import { privateApi } from '@/lib/axios';

const putComment = async ({ id, content }: { id: number; content: string }) => {
  console.log(content);
  const res = await privateApi.put(`/comments/${id}`, { content });
  return res.data;
};

export default putComment;
