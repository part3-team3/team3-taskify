import MembersImage from '@/components/EditDashboard/MembersImage';
import ProfileImage from '@/components/EditDashboard/ProfileImage';
import Modal from '@/components/common/Modal';
import axios from '@/lib/axios';
import icAdd from '@/public/images/icon/ic-add.svg';
import icCrown from '@/public/images/icon/ic-crown.svg';
import icLineVertical from '@/public/images/icon/ic-line-vertical.svg';
import icSetting from '@/public/images/icon/ic-setting.svg';
import { MenuProps } from 'antd';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';

const Dropdown = dynamic(() => import('antd').then((mod) => mod.Dropdown), {
  ssr: false,
});

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <Link href="/">로그아웃</Link>,
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
const NavBar = () => {
  const router = useRouter();
  const dashboardId = Number(router.query.dashboardId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [nickname, setNickname] = useState('');
  const [createdByMe, setCreatedByMe] = useState(false);
  const [value, setValue] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setValue('');
    setIsValidEmail(true);
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (!dashboardId || isNaN(Number(dashboardId))) return;
      try {
        const response = await axios.get(`dashboards/${dashboardId}`);
        setTitle(response.data.title);
        setCreatedByMe(response.data.createdByMe);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dashboardId]);
  //페이지 새로고침
  const handleRefresh = () => {
    if (router.pathname === `/dashboard/${dashboardId}/edit`) {
      window.location.reload();
    } else {
      router.push(`/dashboard/${dashboardId}/edit`);
    }
  };
  // 사용자 이름 가져오기
  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const res = await axios.get(`/users/me`);
        setNickname(res.data.nickname);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchNickname();
  }, []);
  // 초대 이메일 유효성 검사
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  // 이메일로 초대하기 모달 로직
  const handleSubmit = async () => {
    if (!validateEmail(value)) {
      setIsValidEmail(false);
      return;
    }
    try {
      await axios.post(`dashboards/${dashboardId}/invitations`, {
        email: value,
      });
      closeModal();
      router.reload();
    } catch (error) {
      console.error('Error sending invitation:', error);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setValue(email);
    if (isValidEmail === false) {
      setIsValidEmail(true);
      alert('유효하지 않은 이메일입니다');
    }
  };
  const inputClassName = isValidEmail ? 'border-gray-300' : 'border-red-500';
  if (!dashboardId) return null;
  return (
    <div className="flex h-60 items-center justify-between gap-8 border-b border-gray-200 bg-white p-4">
      <div className="flex hidden gap-8 px-[40px] text-xl font-bold md:flex">
        {title}
        {createdByMe && (
          <Image src={icCrown} width={20} height={16} alt="왕관" />
        )}
      </div>
      <div className="flex gap-[16px] px-64">
        <button
          onClick={handleRefresh}
          className="h-[40px] w-[88px] rounded-md border border-solid border-gray-200 bg-white px-2.5 py-4 text-sm text-gray-600"
        >
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
        <MembersImage dashboardId={dashboardId} />
        <Image
          className="mr-8"
          src={icLineVertical}
          width={0}
          height={38}
          alt="구분선"
        />
        <Dropdown menu={{ items }}>
          <div className="flex">
            <div className="pr-0 sm:pr-12">
              <ProfileImage />
            </div>
            <div className="mr-0 flex hidden self-center font-medium sm:block md:pr-40 lg:pr-80">
              {nickname}
            </div>
          </div>
        </Dropdown>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        width="540px"
        height="276px"
      >
        <h2 className="text-2xl font-bold">초대하기</h2>
        <p className="mt-[26px] text-18 text-gray-800">이메일</p>
        <div className="relative">
          <input
            className={`mt-[10px] h-[48px] w-[484px] rounded-md border ${inputClassName}`}
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="이메일을 입력해주세요"
          />
          <div className="mt-[28px] flex justify-end gap-[12px]">
            <button className="btn_modal_large_white" onClick={closeModal}>
              취소
            </button>
            <button className="btn_modal_large_purple" onClick={handleSubmit}>
              초대
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default NavBar;
