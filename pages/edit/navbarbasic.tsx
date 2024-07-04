import ProfileImage from '@/components/EditDashboard/ProfileImage';
import instance from '@/lib/axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import MembersImage from '../../components/EditDashboard/MembersImage';

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

  return (
    <div className="flex h-60 items-center justify-between gap-8 border-b border-gray-200 bg-white p-4">
      <div className="flex gap-8 px-[24px] text-lg font-bold md:px-[40px] md:text-xl">
        내 대시보드
      </div>
      <div className="flex">
        <MembersImage />
      </div>
      <div className="flex gap-[16px]">
        <Link href={'/mypage'} className="flex">
          <ProfileImage />
          <div className="mr-0 flex hidden self-center font-medium sm:block md:pr-40 lg:pr-80">
            {nickname}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
