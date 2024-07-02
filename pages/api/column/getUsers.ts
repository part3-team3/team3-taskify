import axios from '@/lib/axios';

export const getUsers = async () => {
  const token = process.env.NEXT_PUBLIC_TOKEN;
  const res = await axios.get(`users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
