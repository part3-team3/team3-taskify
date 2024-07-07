import MembersImage from '@/components/EditDashboard/MembersImage';
import ProfileImage from '@/components/EditDashboard/ProfileImage';
import MobileModal from '@/components/common/MobileModal';
import Modal from '@/components/common/Modal';
import axios from '@/lib/axios';
import icAdd from '@/public/images/icon/ic-add.svg';
import icCrown from '@/public/images/icon/ic-crown.svg';
import icLineVertical from '@/public/images/icon/ic-line-vertical.svg';
import icSetting from '@/public/images/icon/ic-setting.svg';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';

const Dropdown = dynamic(() => import('antd').then((mod) => mod.Dropdown), {
  ssr: false,
});

const NavBar = () => {
  const router = useRouter();
  const dashboardId = Number(router.query.dashboardId);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
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

  // 페이지 새로고침
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
      alert('유효하지 않은 이메일입니다');
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
    }
  };

  const inputClassName = isValidEmail ? 'border-gray-300' : 'border-red-500';

  if (!dashboardId) return null;

  return (
    <div className="flex h-70 flex-1 items-center justify-center gap-8 border-b border-gray-200 bg-white p-4 lg:justify-between">
      <div className="ml-40 hidden gap-8 text-xl font-bold xl:flex">
        {title}
        {createdByMe && (
          <Image src={icCrown} width={20} height={16} alt="왕관" />
        )}
      </div>
      <div className="sm:px-auto flex gap-10 md:gap-16">
        {createdByMe && (
          <button
            onClick={handleRefresh}
            className="h-30 w-49 items-center rounded-md border border-solid border-gray-200 bg-white px-2.5 py-4 text-xs text-gray-600 md:flex md:h-36 md:w-85 md:gap-[8px] md:text-sm xl:h-40 xl:text-base"
          >
            <Image
              className="hidden md:flex"
              src={icSetting}
              width={20}
              height={20}
              alt="관리"
            />
            관리
          </button>
        )}
        <button
          className="h-30 w-73 rounded-md border border-solid border-gray-200 bg-white px-2.5 py-4 text-xs text-gray-600 md:h-36 md:w-109 md:text-sm xl:h-40 xl:w-116 xl:text-base"
          onClick={openModal}
        >
          <div className="flex gap-[8px]">
            <Image
              className="hidden md:flex"
              src={icAdd}
              width={20}
              height={20}
              alt="초대"
            />
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
        <Dropdown menu={{ items: menuItems }}>
          <div className="flex">
            <div>
              <ProfileImage />
            </div>
            <div className="mr-0 hidden self-center font-medium lg:flex lg:pr-40 xl:pr-80">
              {nickname}
            </div>
          </div>
        </Dropdown>
      </div>
      {isMobile ? (
        <div className="override-flex-center">
          <MobileModal isOpen={isModalOpen} onClose={closeModal}>
            <h2 className="text-xl font-bold">초대하기</h2>
            <p className="mt-[15px] text-16 text-gray-800">이메일</p>
            <div className="relative">
              <input
                className={`mt-[10px] h-42 w-287 rounded-md border px-10 ${inputClassName}`}
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="이메일을 입력해주세요"
              />
              <div className="mt-[20px] flex justify-end gap-[12px]">
                <button className="btn_modal_small_white" onClick={closeModal}>
                  취소
                </button>
                <button
                  className="btn_modal_small_purple"
                  onClick={handleSubmit}
                >
                  초대
                </button>
              </div>
            </div>
          </MobileModal>
        </div>
      ) : (
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
              className={`mt-[10px] h-[48px] w-[484px] rounded-md border px-10 ${inputClassName}`}
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
      )}
    </div>
  );
};

export default NavBar;
