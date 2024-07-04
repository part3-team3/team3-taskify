import PaginationBar from '@/components/MyDashboard/PaginationBar';
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
  const { dashboardId } = router.query;

  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [value, setValue] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const size = 5;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setValue('');
    setIsValidEmail(true);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
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
  }, [page]);

  const onCancelInvitation = async (id: number) => {
    try {
      await axios.delete(`dashboards/9765/invitations/${id}`);
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
      return;
    }
    try {
      await axios.post('dashboards/9765/invitations', { email: value });
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
    <div className="px-20">
      <div className="flex h-[404px] w-[620px] flex-col rounded-lg bg-white px-24 pt-25">
        <div className="flex items-center justify-between">
          <div className="mb-27 text-xl font-bold">초대 목록</div>
          <div className="flex">
            <div className="mb-24 mt-8 flex items-center justify-center">
              <p className="mr-12 text-xs font-normal">
                {totalPage} 페이지 중 {page}
              </p>
              <PaginationBar
                totalPage={totalPage}
                activePage={page}
                onPageChange={onPageChange}
              />
            </div>
            <button
              className="mt-8 flex h-[32px] w-[105px] rounded-md bg-[#5534DA] px-2.5 py-4 text-sm text-gray-600"
              onClick={openModal}
            >
              <div className="flex gap-[8px] text-sm text-white">
                <Image src={IcAddWhite} width={16} height={16} alt="초대" />
                초대하기
              </div>
            </button>
          </div>
        </div>
        <p className="font-sm mb-8 text-[1.125rem] text-[#9FA6B2]">이메일</p>

        <InviteList
          invitations={invitations}
          onCancelInvitation={onCancelInvitation}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        width="540px"
        height="276px"
      >
        <h2 className="text-2xl font-bold">초대하기</h2>
        <p className="mt-[26px] text-18 text-gray-800">이메일</p>
        <input
          className={`mt-[10px] h-[48px] w-[484px] rounded-md border ${inputClassName}`}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="이메일을 입력해주세요"
        />
        {!isValidEmail && (
          <p className="absolute left-0 mt-2 text-sm text-red">
            유효하지 않은 값입니다
          </p>
        )}
        <div className="mt-[28px] flex justify-end gap-[12px]">
          <button className="btn_modal_large_white" onClick={closeModal}>
            취소
          </button>
          <button className="btn_modal_large_purple" onClick={handleSubmit}>
            초대
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DashboardInviteList;
