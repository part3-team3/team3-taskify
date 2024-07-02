// import instance from "@/lib/axios";
import { privateApi } from '@/lib/axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const DashboardMembersEdit = () => {
  //members 상태를 배열로 초기화
  const [members, setMembers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const size = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardId = 9765;

        const res = await privateApi.get(`members`, {
          params: {
            page,
            size,
            dashboardId,
          },
        });
        // "isOwner": true 값을 제외하고 nickname만 추출
        const nicknames = res.data.members
          .filter((member: { isOwner: boolean }) => !member.isOwner)
          .map((member: { nickname: string }) => member.nickname);
        setMembers(nicknames);
        console.log(nicknames);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="px-20">
      <div className="flex h-[404px] w-[620px] flex-col rounded-lg bg-white px-24 pt-25">
        <div className="flex justify-between">
          <div className="mb-30 text-xl font-bold">구성원</div>
          <div>
            {totalPage}페이지 중 {page}
          </div>
          <button onClick={handlePreviousPage} disabled={page === 1}>
            이전
          </button>
          <button onClick={handleNextPage}>다음</button>
        </div>

        <p className="font-sm mb-24 text-[1.125rem] text-[#9FA6B2]">이름</p>
        <div>
          {members.map((nickname, index) => (
            <div key={index}>{nickname}</div>
          ))}
        </div>

        <div className="flex justify-end"></div>
      </div>
    </div>
  );
};

export default DashboardMembersEdit;
