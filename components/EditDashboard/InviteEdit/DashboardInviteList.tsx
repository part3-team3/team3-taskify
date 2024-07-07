import PaginationBar from '@/components/MyDashboard/PaginationBar';
import MobileModal from '@/components/common/MobileModal';
import Modal from '@/components/common/Modal';
import axios from '@/lib/axios';
import IcAddWhite from '@/public/images/icon/ic-add-white.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';

import InviteList from './InviteList';

type Invitation = {
  id: number;
  invitee: { email: string };
};

const DashboardInviteList = () => {
  const router = useRouter();
  const dashboardId = Number(router.query.dashboardId);

  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [value, setValue] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const size = 5;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setValue('');
    setIsValidEmail(true);
    setIsModalOpen(false);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      if (!dashboardId || isNaN(Number(dashboardId))) return;

      try {
        const res = await axios.get(`dashboards/${dashboardId}/invitations`, {
          params: {
            page,
            size,
          },
        });
        setInvitations(res.data.invitations);
        setTotalPage(Math.ceil(res.data.totalCount / size));
      } catch (error) {
        setError('데이터를 불러오는 데 실패했습니다');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dashboardId, page]);

  const onCancelInvitation = async (id: number) => {
    try {
      await axios.delete(`dashboards/${dashboardId}/invitations/${id}`);
      setInvitations((prevInvitations) =>
        prevInvitations.filter((invitation) => invitation.id !== id),
      );
      alert('초대를 취소했습니다');
    } catch (error) {
      console.error('초대 취소에 실패했습니다:', error);
      alert('초대 취소에 실패했습니다');
    }
  };

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };
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

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-12 md:px-20">
      <div className="flex h-395 w-284 flex-col rounded-lg bg-white px-12 pt-25 sm:h-477 sm:w-544 md:px-20 lg:h-477 xl:w-620">
        <div className="flex justify-between">
          <div className="mb-13 text-xl font-bold md:mb-27 md:text-24">
            초대 내역
          </div>
          <div className="block md:flex">
            <div className="mb-24 flex items-center justify-center md:mr-12">
              <p className="mr:12 mr-12 text-xs font-normal md:w-70">
                {totalPage} 페이지 중 {page}
              </p>
              <PaginationBar
                totalPage={totalPage}
                activePage={page}
                onPageChange={onPageChange}
              />
            </div>

            <button
              className="ml-auto mt-2 flex h-[32px] w-[105px] items-center justify-center rounded-md bg-[#5534DA] px-2.5 py-4 text-sm text-gray-600 md:ml-0"
              onClick={openModal}
            >
              <div className="flex gap-8 text-sm text-white">
                <Image src={IcAddWhite} width={16} height={16} alt="초대" />
                초대하기
              </div>
            </button>
          </div>
        </div>
        <p className="-mt-25 mb-12 text-14 text-[#9FA6B2] md:mb-12 md:mt-0 md:text-16">
          이메일
        </p>

        <InviteList
          invitations={invitations}
          onCancelInvitation={onCancelInvitation}
        />
      </div>

      {isMobile ? (
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
              <button className="btn_modal_small_purple" onClick={handleSubmit}>
                초대
              </button>
            </div>
          </div>
        </MobileModal>
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

export default DashboardInviteList;
