import LandingPage from './LandingPage';
import React from 'react';
import { GetServerSideProps } from 'next';
import cookie from 'cookie';
import instance from '@/lib/axios';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const isLoggedIn = cookies['accessToken'] ? true : false;
  // 이미 로그인된 사용자일 경우 대시보드 ID를 받아와서 리다이렉트
  if (isLoggedIn) {
    try {
      // 백엔드 API에 요청하여 dashboardId를 받아옴
      const response = await instance.get(`dashboards?navigationMethod=pagination`, {
        headers: {
          Authorization: `Bearer ${cookies['accessToken']}`
        }
      });
      const dashboardId = response.data.dashboards[0].id;
      return {
        redirect: {
          destination: `/dashboard/${dashboardId}`,
          permanent: false,
        },
      };
    } catch (error) {
      console.error('Error fetching dashboardId:', error);
      // 에러 처리에 따라 적절한 조치를 취할 수 있습니다.
    }
  }

  return {
    props: {},
  };
};

export default function Home() {
  return (
    <>
      <LandingPage />
    </>
  );
}
