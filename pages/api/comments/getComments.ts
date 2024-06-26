import axios from '@/lib/axios';

export const getComments = async (cursorId?: number) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk3NiwidGVhbUlkIjoiNi0zIiwiaWF0IjoxNzE5MjAwODQzLCJpc3MiOiJzcC10YXNraWZ5In0.ybVvT21thF6vjcG5ReI_XlIHCSn45HoFt6FTWKYYAm8';
  const res = await axios.get(
    `comments?size=10&cardId=8667${cursorId ? '&cursorId=' + cursorId : ''}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};
