import PaginationBar from '@/components/MyDashboard/PaginationBar';
import Modal from '@/components/common/Modal';
import axios from '@/lib/axios';
import IcAddWhite from '@/public/images/icon/ic-add-white.svg';
import React, { useEffect, useState } from 'react';

import InviteList from './InviteList';

const DashboardInviteList = () => {
  const [invitations, setInvitations] = useState<
    { id: number; inviter: { email: string } }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const size = 4;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`dashboards/9765/invitations`, {
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
      await axios.delete(`invitations/${id}`);
      setInvitations((prevInvitations) =>
        prevInvitations.filter((invitation) => invitation.invitee.id !== id),
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

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-20">
      <div className="flex h-[404px] w-[620px] flex-col rounded-lg bg-white px-24 pt-25">
        <div className="flex items-center justify-between">
          <div className="mb-27 text-xl font-bold">초대 목록</div>
          <div className="mb-24 mt-8 flex items-center justify-end">
            {totalPage > 1 && (
              <>
                <p className="mr-12 text-xs font-normal">
                  {totalPage} 페이지 중 {page}
                </p>
                <PaginationBar
                  totalPage={totalPage}
                  activePage={page}
                  onPageChange={onPageChange}
                />
              </>
            )}
          </div>
          <button
            className="flex h-[32px] w-[105px] rounded-md bg-[#5534DA] bg-white px-2.5 py-4 text-sm text-gray-600"
            onClick={openModal}
          >
            초대하기
          </button>
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
          className="mt-[10px] h-48 w-484 rounded-md border border-gray-300"
          type="text"
          placeholder="이메일을 입력하세요"
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

export default DashboardInviteList;
