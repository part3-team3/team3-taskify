import axios from '@/lib/axios';

export const addColumn = async (dashboardId: number) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAwMywidGVhbUlkIjoiNi0zIiwiaWF0IjoxNzE5NDgzMjA2LCJpc3MiOiJzcC10YXNraWZ5In0.j4rrDwXVyrJnrIZNFSOgSHzj6lz2S0qHjmBpgK-8FkM';

  const body = {
    title: 'empty',
    dashboardId: dashboardId, // dashboardId를 숫자형으로 변환해서 동적 연결
  };
  const res = await axios.post('columns', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
