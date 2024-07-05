import axios from '@/lib/axios';

const postCardImage = async (imageUrl: FormData, columnId: number) => {
  const res = await axios.post(`columns/${columnId}/card-image`, imageUrl);
  return res.data;
};

export default postCardImage;
