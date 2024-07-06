import LoginLogo from '@/public/images/logo/login-logo.svg';
import cookie from 'cookie';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import LoginForm from '../components/LoginForm';

// getServerSideProps 사용
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  console.log(req.headers.cookie);
  const cookies = cookie.parse(req.headers.cookie || '');
  const isLoggedIn = cookies['accessToken'] ? true : false;

  // 이미 로그인된 사용자일 경우 마이 페이지로 리다이렉트
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

const LoginPage = () => {
  return (
    <div className="mx-auto flex max-w-520 flex-col">
      <div className="xl:203 flex flex-col items-center gap-8 pb-40 pt-124 sm:pb-60 sm:pt-193 xl:pb-40">
        <Link href="/">
          <Image
            className="sm:h-279 sm:w-200"
            src={LoginLogo}
            alt="LoginLogo"
            priority={true}
            width={120}
            height={167}
          />
        </Link>
        <div className="text-20">오늘도 만나서 반가워요!</div>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
