import Modal from '@/components/Modal';
import instance from '@/lib/axios';
import icAdd from '@/public/images/icon/ic-add.svg';
import icCrown from '@/public/images/icon/ic-crown.svg';
import icLineVertical from '@/public/images/icon/ic-line-vertical.svg';
import icSetting from '@/public/images/icon/ic-setting.svg';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [nickname, setNickname] = useState('');
  const [profile, setProfile] = useState('');
  const [createdByMe, setCreatedByMe] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk5OCwidGVhbUlkIjoiNi0zIiwiaWF0IjoxNzE5NDgyMzk4LCJpc3MiOiJzcC10YXNraWZ5In0.duwqLvblOuUU7QTXyx1oKc0N14yhQL4qwvLUZcPG-zk'; // 로그인 후 받은 토큰
      try {
        const response = await instance.get(`dashboards/9765`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log('API response:', response.data.title);
        setTitle(response.data.title);
        setCreatedByMe(response.data.createdByMe);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk5OCwidGVhbUlkIjoiNi0zIiwiaWF0IjoxNzE5NDgyMzk4LCJpc3MiOiJzcC10YXNraWZ5In0.duwqLvblOuUU7QTXyx1oKc0N14yhQL4qwvLUZcPG-zk'; // 로그인 후 받은 토큰
      try {
        const res = await instance.get(`/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNickname(res.data.nickname);
        // console.log('API response:', res.data.nickname);
        setProfile(res.data.profileImageUrl);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="flex h-60 items-center justify-between gap-8 border-b border-gray-200 bg-white p-4">
      <div className="flex gap-8 px-[40px] text-xl font-bold">
        {title}
        {createdByMe && (
          <Image src={icCrown} width={20} height={16} alt="왕관" />
        )}
      </div>
      <div className="flex gap-[16px]">
        <button className="h-[40px] w-[88px] rounded-md border border-solid border-gray-200 bg-white px-2.5 py-4 text-sm text-gray-600">
          <div className="flex gap-[8px] text-base">
            <Image src={icSetting} width={20} height={20} alt="관리" />
            관리
          </div>
        </button>
        <button
          className="h-[40px] w-[116px] rounded-md border border-solid border-gray-200 bg-white px-2.5 py-4 text-sm text-gray-600"
          onClick={openModal}
        >
          <div className="flex gap-[8px] text-base">
            <Image src={icAdd} width={20} height={20} alt="초대" />
            초대하기
          </div>
        </button>
        <Image
          className="mr-8"
          src={icLineVertical}
          width={0}
          height={38}
          alt="선"
        />
        <Link href={'/mypage'} className="flex">
          <Image src={profile} width={38} height={38} alt="프로필" />
          <div className="mr-0 flex items-center justify-center lg:mr-80">
            {nickname}
          </div>
        </Link>
      </div>

      // 초대하기 모달 
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        width="540px"
        height="276px"
      >
        <h2 className="text-2xl font-bold">초대하기</h2>
        <p className="mt-[26px] text-18 text-gray-800">이메일</p>
        <input
          className="mt-[10px] h-48 w-484 rounded-md border border-gray-300"
          type="text"
          placeholder="이메일을 입력해주세요"
        />
        <div className="mt-[28px] flex justify-end gap-[12px]">
          <button className="btn_modal_large_white" onClick={closeModal}>
            취소
          </button>
          <button className="btn_modal_large_purple">초대</button>
        </div>
      </Modal>
    </div>
  );
};

export default NavBar;


