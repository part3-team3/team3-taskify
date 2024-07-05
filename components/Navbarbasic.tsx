import ProfileImage from '@/components/EditDashboard/ProfileImage';
import instance from '@/lib/axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const NavBarbasic = () => {
  const [nickname, setNickname] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
      <div
        onClick={toggleDropdown}
        className="flex cursor-pointer items-center gap-[16px]"
      >
        <div className="pr-0 sm:pr-12">
          <ProfileImage />
        </div>
        <div className="mr-0 flex hidden self-center font-medium sm:block md:pr-40 lg:pr-80">
          {nickname}
        </div>
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 z-10 mt-125 w-100 rounded-lg border border-gray-200 bg-white shadow-lg md:mr-30 lg:mr-53">
          <a
            href="/"
            className="align-center block flex justify-center px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            로그아웃
          </a>
          <a
            href="/mypage"
            className="align-center block flex justify-center px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            내 정보
          </a>
          <a
            href="/mydashboard"
            className="align-center block flex justify-center px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            내 대시보드
          </a>
        </div>
      )}
    </div>
  );
};

export default NavBarbasic;
