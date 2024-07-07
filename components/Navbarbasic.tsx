import ProfileImage from '@/components/EditDashboard/ProfileImage';
import instance from '@/lib/axios';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import router from 'next/router';
import React, { useEffect, useState } from 'react';

const Dropdown = dynamic(() => import('antd').then((mod) => mod.Dropdown), {
  ssr: false,
});

const NavBar = () => {
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const res = await instance.get(`/users/me`);
        setNickname(res.data.nickname);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchNickname();
  }, []);

  const handleLogout = () => {
    Cookies.remove('accessToken'); // 쿠키에서 토큰 삭제
    router.push('/'); // 루트 페이지로 리디렉션
  };

  const menuItems = [
    {
      key: '1',
      label: '로그아웃',
      onClick: handleLogout,
    },
    {
      key: '2',
      label: <Link href="/mypage">내 정보</Link>,
    },
    {
      key: '3',
      label: <Link href="/mydashboard">내 대시보드</Link>,
    },
  ];

  return (
    <div className="flex h-60 items-center justify-between gap-8 border-b border-gray-200 bg-white p-4">
      <div className="flex gap-8 px-[24px] text-lg font-bold md:px-[40px] md:text-xl">
        내 대시보드
      </div>
      <div className="flex gap-[16px]">
        <Dropdown menu={{ items: menuItems }}>
          <Link href={'/mypage'} className="flex">
            <ProfileImage />
            <div className="mr-0 hidden self-center font-medium sm:block md:pr-40 md:marker:flex lg:pr-80">
              {nickname}
            </div>
          </Link>
        </Dropdown>
      </div>
    </div>
  );
};

export default NavBar;
