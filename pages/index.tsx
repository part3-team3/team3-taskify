import LandingPage from './LandingPage';

import React from 'react';
import { GetServerSideProps } from 'next';
import cookie from 'cookie';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  console.log('Landing Page Cookies:', req.headers.cookie);
  const cookies = cookie.parse(req.headers.cookie || '');
  const isLoggedIn = cookies['accessToken'] ? true : false;
  console.log('Is Logged In:', isLoggedIn);
  // 이미 로그인된 사용자일 경우 메인 페이지로 리다이렉트
  if (isLoggedIn) {
    return {
      redirect: {
        destination: '/mypage',
        permanent: false,
      },
    };
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
