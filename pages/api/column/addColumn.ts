import axios from '@/lib/axios';

export const addColumn = async (dashboardId: string) => {
  const token = process.env.NEXT_PUBLIC_TOKEN;
  const body = {
    title: 'empty',
    dashboardId: parseInt(String(dashboardId)), // dashboardId를 숫자형으로 변환해서 동적 연결
  };
  const res = await axios.post('columns', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
