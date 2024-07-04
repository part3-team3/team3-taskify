import axios from '@/lib/axios';

const postCardImage = async (imageUrl, columnId = 33798) => {
  const res = await axios.post(`columns/${columnId}/card-image`, imageUrl);
  return res.data;
};

export default postCardImage;
