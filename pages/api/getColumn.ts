import axios from '@/lib/axios';

export const getColumn = async (dashboardId: string) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAwMywidGVhbUlkIjoiNi0zIiwiaWF0IjoxNzE5NDgzMjA2LCJpc3MiOiJzcC10YXNraWZ5In0.j4rrDwXVyrJnrIZNFSOgSHzj6lz2S0qHjmBpgK-8FkM';
  const res = await axios.get(`columns?dashboardId=${dashboardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
