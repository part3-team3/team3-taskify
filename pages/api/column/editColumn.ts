import axios from '@/lib/axios';

export const editColumn = async (columnId: number, title: string) => {
  // const token = process.env.NEXT_PUBLIC_TOKEN;
  const body = {
    title: `${title}`,
  };
  const res = await axios.put(
    `columns/${columnId}`,
    body,
    //   , {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
  return res.data;
};
