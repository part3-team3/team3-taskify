import Modal from '@/components/Modal';
import instance from '@/lib/axios';
import icAddWhite from '@/public/images/icon/ic-add-white.svg';
// import icAdd from '@/public/images/icon/ic-add.svg';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const DashboardInviteList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk5OCwidGVhbUlkIjoiNi0zIiwiaWF0IjoxNzE5NDgyMzk4LCJpc3MiOiJzcC10YXNraWZ5In0.duwqLvblOuUU7QTXyx1oKc0N14yhQL4qwvLUZcPG-zk'; // 로그인 후 받은 토큰
      try {
        const res = await instance.get(`dashboards/9765/invitations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('API email:', res.data.email);
        setEmail(res.data.email);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // const [pages,setPages] = useState('');
  // const [currentPage, setCurrentPage] = useState('');

  // useEffect(FetchData) = () => {
  //   const res = instance.get('')
  //   FetchData,[]
  // };
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-20">
      <div className="flex h-[477px] w-[620px] justify-between rounded-lg bg-white px-24 pt-25">
        <div className="mb-30 flex text-xl font-bold">초대내역</div>
        <button
          className="flex h-[32px] w-[105px] rounded-md bg-[#5534DA] bg-white px-2.5 py-4 text-sm text-gray-600"
          onClick={openModal}
        >
          <div className="flex gap-[8px] text-sm text-white">
            <Image src={icAddWhite} width={16} height={16} alt="초대" />
            초대하기
          </div>
        </button>

        {/* <div className="text-sm">
          {pages}페이지 중{currentPage}
        </div> */}
      </div>
      <p className="font-sm text-[1.125rem] text-[#9FA6B2]">이메일</p>
      <div>{email}</div>

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

export default DashboardInviteList;
